#!/usr/bin/env python3

import socket
import struct
import fcntl
import time

def encode_ipaddr(ipaddr: str) -> bytes:
    result = 0
    octets = ipaddr.split('.')
    for i in range(0, 4):
        result += int(octets[i]) << (len(octets) - i - 1) * 8
    return result.to_bytes(4, 'big')

def encode_macaddr(macaddr: str) -> bytes:
    result = 0
    octets = []
    if '-' in macaddr:
        octets = macaddr.split('-')
    elif ':' in macaddr:
        octets = macaddr.split(':')
    for i in range(0, 6):
        result += int(octets[i], 16) << (len(octets) - i - 1) * 8
    return result.to_bytes(6, 'big')

def decode_ipaddr(ipaddr: bytes) -> str:
    return '.'.join([str(octet) for octet in list(struct.unpack('!BBBB', ipaddr))])

def decode_macaddr(macaddr: bytes) -> str:
    return ':'.join([format(octet, 'x').rjust(2, '0') for octet in list(struct.unpack('!BBBBBB', macaddr))])

def get_ip(interface: str) -> str:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    #return socket.inet_ntoa(fcntl.ioctl(sock.fileno(), 0x8915, struct.pack('256s', interface.encode()))[20:24])
    return fcntl.ioctl(sock.fileno(), 0x8915, struct.pack('256s', interface.encode()))[20:24]

def get_macaddr(interface: str) -> str:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    #return fcntl.ioctl(s.fileno(), 0x8927,  struct.pack('256s', interface.encode()))
    return int.from_bytes(fcntl.ioctl(sock.fileno(), 0x8927,  struct.pack('256s', interface.encode()))[18:24], 'big')

def get_interface_info(interface: str) -> dict:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    info = dict()
    info['ip'] = fcntl.ioctl(sock.fileno(), 0x8915, struct.pack('256s', interface.encode()))[20:24]
    info['mac'] = fcntl.ioctl(sock.fileno(), 0x8927,  struct.pack('256s', interface.encode()))[18:24]
    return info

def arp_request(interface: str, dest_ip: bytes) -> bytes:
    # Create L2 socket
    sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.htons(0x0003))
    sock.settimeout(5)
    sock.bind((interface, 0))
    if_info = get_interface_info(interface)
    
    # Create request datagram
    print(encode_macaddr('ff:ff:ff:ff:ff:ff'))
    header = struct.pack('!6s6sH', encode_macaddr('ff:ff:ff:ff:ff:ff'), if_info['mac'], 0x0806)
    packet = struct.pack('!HHBBH6s4s6s4s', 0x0001, 0x0800, 0x06, 0x04, 0x0001, if_info['mac'], if_info['ip'], encode_macaddr('ff:ff:ff:ff:ff:ff'), encode_ipaddr(dest_ip))
    sock.send(header + packet)
    data = sock.recvfrom(2048)
    sock.close()
    return data[0]

def format_data(data: bytes):
    print('############## PACKET ###############')
    print('packet_length: ' + str(len(data)))
    print('############## HEADER ###############')
    dst_mac, src_mac, ether_type = struct.unpack('!6s6sH', data[:14])
    print('Destination MacAddress: ' + decode_macaddr(dst_mac))
    print('Source MacAddress: ' + decode_macaddr(src_mac))
    print('Ethernet Type: ' + str(ether_type))
    print('############## BODY ###############')
    ht, pt, hal, pal, op, src_mac, src_ip, dst_mac, dst_ip = struct.unpack('!HHBBH6s4s6s4s', data[14:42])
    print('Hardware Type: ' + str(ht))
    print('Protocol Type: ' + str(hex(pt)))
    print('MacAddress Length: ' + str(hal))
    print('Operation Code: ' + str(op))
    print('Source MacAddress: ' + decode_macaddr(src_mac))
    print('Source IpAddress: ' + decode_ipaddr(src_ip))
    print('Destination MacAddress: ' + decode_macaddr(dst_mac))
    print('Destination IpAddress: ' + decode_ipaddr(dst_ip))

if __name__ == '__main__':
    data = arp_request('br0', '10.0.222.7')
    format_data(data)
