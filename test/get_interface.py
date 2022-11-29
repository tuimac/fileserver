#!/usr/bin/env python3

import socket
import array
import struct
import fcntl
import os
import json
import traceback

def _get_ip(interface: str) -> str:
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        ipaddr = fcntl.ioctl(sock.fileno(), 0x8915,  struct.pack('256s', interface.encode()))[20:24]
        return '.'.join([str(octet) for octet in struct.unpack('!BBBB', ipaddr)])
    except:
        return ''

def _get_mac(interface: str) -> str:
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        macaddr = fcntl.ioctl(sock.fileno(), 0x8927, struct.pack('256s', interface.encode()))[18:24]
        return ':'.join([format(octet, 'x').rjust(2, '0') for octet in struct.unpack('!BBBBBB', macaddr)])
    except:
        return ''

def _get_subnet(interface: str) -> str:
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        subnet = fcntl.ioctl(sock.fileno(), 0x891B, struct.pack('256s', interface.encode()))[20:24]
        return '.'.join([str(octet) for octet in struct.unpack('!BBBB', subnet)])
    except:
        return ''

def get_interface_info(interface: str) -> dict:
    info = dict()
    info['interface'] = interface
    info['ip'] = _get_ip(interface)
    info['mac'] = _get_mac(interface)
    info['subnet'] = _get_subnet(interface)
    return info

if __name__ == '__main__':
    iface_dir = '/sys/class/net'
    for iface in os.listdir(iface_dir):
        try:
            result = json.dumps(get_interface_info(iface), indent=2)
            print(result)
        except:
            traceback.print_exc()
            pass
