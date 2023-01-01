from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from utils.replyformat import ReplyFormat
from backend.settings import CONFIG
import logging
import traceback
import os

logger = logging.getLogger("django")

class FilePreviewAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            file_path = os.path.join(CONFIG['root_directory'], self.kwargs.get('path'))
            with open(file_path, 'r') as f:
                result = { 'readable': True }
                result['content'] = f.read()
                return Response(
                    ReplyFormat.status_200(result),
                    status=status.HTTP_200_OK
                )
        except UnicodeDecodeError:
            result = { 'readable': False }
            return Response(
                ReplyFormat.status_200(result),
                status=status.HTTP_200_OK
            )
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
