#!/usr/bin/env python3

import time
import socket
import sys
from threading import Thread
import traceback

def runRecv():
    recv = Receiver('localhost', 9000)
    recv.daemon = True
    recv.start()

def createPacket(macaddr):
    packet = b''
    mac_bin = b''
    for parts in macaddr.split(':'):
        print(int(parts, 16))
        mac_bin = mac_bin + int(parts, 16).to_bytes(2, 'big')
    packet = b'\xff' * 6
    packet = packet + mac_bin * 16
    return packet

def sendPacket(packet, ip):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(packet, (ip, 9000))

class Receiver(Thread):
    def __init__(self, ip, port):
        Thread.__init__(self)
        self.ip = ip
        self.port = port
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.__buffer = 512

    def run(self):
        try:
            self.socket.bind((self.ip, self.port))
            data = self.socket.recvfrom(self.__buffer)
            print(data)
            print(len(data[0]))
        except:
            traceback.print_exc()

if __name__ == '__main__':
    if len(sys.argv) == 1:
        exit(1)
    runRecv()
    macaddr = sys.argv[1]
    packet = createPacket(macaddr)
    sendPacket(packet, 'localhost')
    #confirmWakeup()
