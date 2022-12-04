import json
import logging
import traceback
import os
from exceptions.default import ItemTypeError
from backend.settings import CONFIG
from utils.sanitizepath import sanitizepath

logger = logging.getLogger("django")

class Filelist:
    @staticmethod
    def listitems(path) -> dict:
        item_data = {}
        item_data['directories'] = []
        item_data['files'] = []
        path = sanitizepath(CONFIG['root_directory']) + '/' + sanitizepath(path)
        logger.info(path)
        for item in os.listdir(path):
            if os.path.isdir(path + '/' + item):
                item_data['directories'].append(item)
            elif os.path.isfile(path + '/' + item):
                item_data['files'].append(item)
            else:
                raise ItemTypeError(path + '/' + item)

        return item_data
