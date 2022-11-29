#!/usr/bin/env python3

import socket
import struct
import fcntl

if __name__ == '__main__':
    iface = 'br0'
    subnet = fcntl.ioctl(socket.socket(socket.AF_INET, socket.SOCK_DGRAM), 35099, struct.pack('256s', iface.encode()))[20:24]
    print(subnet)
