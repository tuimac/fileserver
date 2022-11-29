#!/usr/bin/env python3

import time
import socket
import sys
from threading import Thread
import traceback

def runRecv():
    recv = Receiver('localhost', 4000)
    recv.daemon = True
    recv.start()
    recv.join()

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

def receiver():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(('localhost', 4000))
    sock.setblocking(1)
    data = sock.recvfrom(512)
    print(data)

if __name__ == '__main__':
    receiver()
