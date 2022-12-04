import json
import logging
import traceback
import os
from exceptions.default import ItemTypeError
from backend.settings import CONFIG

logger = logging.getLogger("django")

class Filelist:
    @staticmethod
    def listitems(path) -> dict:
        for item in os.listdir(path):
            if os.path.isdir(path + '/' + item):
                data['directory'] = 
            elif os.path.isfile(path + '/' + item):
                data[item] = 'file'
            else:
                raise ItemTypeError(path + '/' + item)
