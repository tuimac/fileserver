#!/usr/bin/env python3

import time
import socket
import sys
from threading import Thread
import traceback
import struct

def createPacket(macaddr):
    return b'\xff' * 6 + (struct.pack('BBBBBB', *([int(octet, 16) for octet in macaddr.split(':')]))) * 16

def sendPacket(packet):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
    sock.sendto(packet, ('255.255.255.255', 7))

def confirmWakeup():
    def checksum():
        header = struct.pack('!BBhHH', 8, 0, 0, 1, 1)
        checksum = int.from_bytes(header, 'big')
        while checksum > 0xffff:
            checksum = (checksum & 0xffff) + (checksum >> 16)
        return ~checksum

    def createpacket():
        csum = checksum()
        header = struct.pack('!BBhHH', 8, 0, csum, 1, 1)
        return header + b''

    def sendpacket(ip, packet):
        sock = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_ICMP)
        sock.sendto(packet, (ip, 0))
        return sock.recv(512)
        
    packet = createpacket()
    data = sendpacket('8.8.8.8', packet)

    print('######################################################3')
    print(data[:20])
    version, service, length, msg_id, offset, ttl, protocol, checksum, src_ip, dst_ip = struct.unpack('!BBHHHBBHII', data[:20])
    print('version: ' + str(version))
    print('service: ' + str(service))
    print('length: ' + str(length))
    print('msg_id: ' + str(msg_id))
    print('msg_seq_num: ' + str(msg_seq_num))
    print('msg_seq_num: ' + str(msg_seq_num))
    print('msg_seq_num: ' + str(msg_seq_num))
    print('msg_seq_num: ' + str(msg_seq_num))

    print('######################################################3')
   
    print(data[20:28])
    print(data)
    msg_type, msg_code, msg_checksum, msg_id, msg_seq_num = struct.unpack('!BBhHH', data[20:28])
    print('msg_type: ' + str(msg_type))
    print('msg_code: ' + str(msg_code))
    print('msg_checksum: ' + str(msg_checksum))
    print('msg_id: ' + str(msg_id))
    print('msg_seq_num: ' + str(msg_seq_num))

    print('######################################################3')
    print(packet)
    msg_type, msg_code, msg_checksum, msg_id, msg_seq_num = struct.unpack('!BBhHH', packet)
    print('msg_type: ' + str(msg_type))
    print('msg_code: ' + str(msg_code))
    print('msg_checksum: ' + str(msg_checksum))
    print('msg_id: ' + str(msg_id))
    print('msg_seq_num: ' + str(msg_seq_num))


if __name__ == '__main__':
    '''
    if len(sys.argv) == 1:
        exit(1)
    macaddr = sys.argv[1]
    packet = createPacket(macaddr)
    sendPacket(packet)
    '''
    confirmWakeup()

