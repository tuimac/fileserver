#!/usr/bin/env python3

import os

class Test:
    def _get_dir_size(path='.'):
        total_size = 0
        with os.scandir(path) as it:
            for entry in it:
                if entry.is_file():
                    total_size += entry.stat().st_size
                elif entry.is_dir():
                    total_size += _get_dir_size(entry.path)
        return total_size
    @staticmethod
    def getitemsize(path):
        result = {}
        for item in os.listdir(path):
            item_path = os.path.join(path, item)
            if os.path.isfile(item_path):
                result[item] = os.path.getsize(item_path)
            elif os.path.isdir(item):
                result[item] = _get_dir_size(item_path)
        return result

if __name__ == '__main__':
    print(Test.getitemsize('/root'))
