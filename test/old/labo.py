#!/usr/bin/env python3

import struct

if __name__ == '__main__':
    header = struct.pack('!BBHHH', 8, 0, 0, 1, 1)
    checksum = int.from_bytes(header, 'big')
    while checksum > 0xffff:
        checksum = (checksum & 0xffff) + (checksum >> 16)
    print(checksum)
