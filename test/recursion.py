#!/usr/bin/env python3

import os
import json
import sys

def search_dirs(path):
    data = {}
    for item in os.listdir(path):
        if os.path.isdir(path + '/' + item):
            data[item] = search_dirs(path + '/' + item)
        elif os.path.isfile(path + '/' + item):
            data[item] = 'file'
        else:
            raise Exception(path + '/' + item + ' is not file and directory.')
    return data

if __name__ == '__main__':
    sys.setrecursionlimit(10000)
    PATH = '/root/file_server'
    print(json.dumps(
        search_dirs(PATH),
        indent = 2
    ))
