import os
import re

@staticmethod
def sanitizepath(path):
    if re.match('.*\/$', path):
        path = path[:-1]
    return path
