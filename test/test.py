#!/usr/bin/env python3

import os
import json

PATH = '/home/ec2-user/file_server'

def search_dirs(path, data):
    current_directory, directories, files = os.walk(path)
    if len(directories) > 0:
        for directory in directories:
            data[current_directory] = dict()
            data[current_directory] = search_dirs(path + '/' + directory, )
    else:
        data[current_direcotry] = files
        


if __name__ == '__main__':
    json.dump(search_dirs(PATH, dict()))
