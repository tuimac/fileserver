import struct
import socket
import fcntl
from exceptions.default import MacAddressFormatException

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
    def int_to_byte_ip(ipaddr: str) -> bytes:
        return int(ipaddr, base=10).to_bytes(4, 'big')

    @staticmethod
    def string_to_byte_mac(ipaddr: str) -> bytes:
        result = 0
        octets = []
        if '-' in macaddr:
            octets = macaddr.split('-')
        elif ':' in macaddr:
            octets = macaddr.split(':')
        else:
            raise MacAddressFormatException
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
