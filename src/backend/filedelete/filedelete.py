
import logging
import os
from backend.settings import CONFIG

logger = logging.getLogger("django")

class Filedelete:

    @staticmethod
    def deletefiles(target_path, target_files) -> dict:
        dir_path = os.path.join(CONFIG['root_directory'], target_path)
        for target_file in target_files:
            target_item_path = os.path.join(dir_path, target_file)
            if os.path.isfile(target_item_path):
                os.remove(target_item_path)
                logger.info('File: ' + target_item_path + ' is removed.')
            else:
                os.rmdir(target_item_path)
                logger.info('Directory: ' + target_item_path + ' is removed.')