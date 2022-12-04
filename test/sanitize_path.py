#!/usr/bin/env python3

import os
import re

if __name__ == '__main__':
    path = '/root/test/'

    if re.match('.*\/$', path):
        path = path[:-1]
        print(path)
    print(path)
