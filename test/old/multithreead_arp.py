#!/usr/bin/env python3

import socket
import struct
import fcntl
import traceback
import time
import threading
from queue import Queue

class Net:
    @staticmethod
    def bytes_to_string_ip(ipaddr: bytes) -> str:
        return '.'.join([str(octet) for octet in struct.unpack('!BBBB', ipaddr)])

    @staticmethod
    def bytes_to_string_mac(macaddr: bytes) -> str:
        return ':'.join([format(octet, 'x').rjust(2, '0') for octet in struct.unpack('!BBBBBB', macaddr)])

    @staticmethod
    def string_to_byte_ip(ipaddr: str) -> bytes:
        result = 0
        octets = ipaddr.split('.')
        for i in range(0, 4):
            result += int(octets[i]) << (len(octets) - i - 1) * 8
        return result.to_bytes(4, 'big')

    @staticmethod
    def string_to_byte_mac(ipaddr: str) -> bytes:
        result = 0
        octets = []
        if '-' in macaddr:
            octets = macaddr.split('-')
        elif ':' in macaddr:
            octets = macaddr.split(':')
        else:
            print('Exception')
        for i in range(0, 6):
            result += int(octets[i], 16) << (len(octets) - i - 1) * 8
        return result.to_bytes(6, 'big')

    @staticmethod 
    def get_ip_from_if(interface: str) -> dict:
        result = dict()
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        result['ip'] = fcntl.ioctl(sock.fileno(), 0x8915, struct.pack('256s', interface.encode()))[20:24]
        result['subnet'] = fcntl.ioctl(sock.fileno(), 0x891B, struct.pack('256s', interface.encode()))[20:24]
        return result

    @staticmethod 
    def get_mac_from_if(interface: str) -> bytes:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        return fcntl.ioctl(sock.fileno(), 0x8927,  struct.pack('256s', interface.encode()))[18:24]

    @staticmethod
    def get_default_ifname():
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.connect(('8.8.8.8', 0))
        default_ip = sock.getsockname()[0]
        for ifname in socket.if_nameindex():
            try:
                if default_ip == socket.inet_ntoa(fcntl.ioctl(sock.fileno(), 0x8915, struct.pack('256s', ifname[1].encode()))[20:24]):
                    return ifname[1]
            except:
                pass
        return None

def get_if_info(interface: str) -> str:
    result = dict()
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    result['ip'] = fcntl.ioctl(sock.fileno(), 0x8915, struct.pack('256s', interface.encode()))[20:24]
    result['subnet'] = fcntl.ioctl(sock.fileno(), 0x891B, struct.pack('256s', interface.encode()))[20:24]
    return result

class Endpoint(threading.Thread):
    def __init__(self, queue, dest_ip, interface, timeout, sock):
        threading.Thread.__init__(self)
        self.queue = queue
        self.dest_ip = dest_ip
        self.interface = interface
        self.timeout = timeout
        self.sock = sock

    def run(self):
        try:
            # If Network interface name is not difined, get the default network interface name. 
            if self.interface is None:
                self.interface = Net.get_default_ifname()
                
            # Initial parameters
            src_mac = Net.get_mac_from_if(self.interface)
            src_ip = Net.get_ip_from_if(self.interface)['ip']

            # Create the arp packet
            header = struct.pack('!6s6sH',
                b'\xff\xff\xff\xff\xff\xff',
                src_mac,
                0x0806
            )
            packet = struct.pack('!HHBBH6s4s6s4s',
                0x0001,
                0x0800,
                0x06,
                0x04,
                0x0001,
                src_mac,
                src_ip,
                b'\xff\xff\xff\xff\xff\xff',
                self.dest_ip
            )

            # Send Arp packet
            self.sock.send(header + packet)
            data = self.sock.recvfrom(2048)
            self.queue.put(data)
            return
        except TimeoutError:
            pass
        except:
            traceback.print_exc()

class Manager(threading.Thread):
    def __init__(self, info, queue):
        threading.Thread.__init__(self)
        self.info = info
        self.queue = queue
        self.sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.htons(0x0003))
        self.sock.settimeout(0.5)
        self.sock.bind(('br0', 0))

    def run(self):
        broadcast = 4294967295
        ip = int.from_bytes(info['ip'], 'big')
        subnet = int.from_bytes(info['subnet'], 'big')
        begin  = ip & subnet

        for i in range(0, broadcast - subnet):
            target_ip = begin + i
            bytes_ip = target_ip.to_bytes((target_ip.bit_length() + 7) // 8, 'big')
            endpoint = Endpoint(self.queue, bytes_ip, 'br0', 0.5, self.sock)
            endpoint.daemon = True
            endpoint.start()

def scan(info):
    queue = Queue()

    manager = Manager(info, queue)
    manager.daemon = True
    manager.start()
    while True:
        try:
            data = queue.get()
            ht, pt, hal, pal, op, src_mac, src_ip, dst_mac, dst_ip = struct.unpack('!HHBBH6s4s6s4s', data[0][14:42])
            if str(op) =='2':
                print(Net.bytes_to_string_ip(dst_ip))
        except:
            traceback.print_exc()

if __name__ == '__main__':
    info = get_if_info('br0')
    scan(info)
