import json
import logging
import traceback
import os
from backend.settings import CONFIG

logger = logging.getLogger("django")

class Fileupload:

    @staticmethod
    def writefile(target_path, filename, rfd) -> dict:
        dir_path = os.path.join(CONFIG['root_directory'], target_path)
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'wb') as wfd:
            wfd.write(rfd.read())