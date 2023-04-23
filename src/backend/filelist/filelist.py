import json
import logging
import traceback
import os
import re
from exceptions.default import ItemTypeError
from backend.settings import CONFIG

logger = logging.getLogger("django")

class Filelist:

    @staticmethod
    def listitems(path) -> dict:
        item_data = {}
        item_data['directories'] = []
        item_data['files'] = []
        path = os.path.join(CONFIG['root_directory'], path)
        for item in os.listdir(path):
            if os.path.isdir(os.path.join(path, item)):
                item_data['directories'].append(item)
            elif os.path.isfile(os.path.join(path, item)):
                item_data['files'].append(item)
            else:
                raise ItemTypeError(os.path.join(path, item))

        return item_data

    @staticmethod
    def listitemsize(path) -> dict:
        def _get_dir_size(path) -> int:
            total_size = 0
            logger.info(path)
            with os.scandir(path) as it:
                for entry in it:
                    if entry.is_file():
                        total_size += entry.stat().st_size
                    elif entry.is_dir():
                        total_size += _get_dir_size(entry.path)
            return total_size
        size_info = {}
        path = re.sub('^/', '', path)
        path = os.path.join(CONFIG['root_directory'], path)
        logger.info(path)
        for item in os.listdir(path):
            item_path = os.path.join(path, item)
            if os.path.isfile(item_path):
                size_info[item] = os.path.getsize(item_path)
            elif os.path.isdir(item_path):
                size_info[item] = _get_dir_size(item_path)
        return size_info