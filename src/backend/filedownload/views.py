from rest_framework import views, status
from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.renderers import JSONRenderer
from utils.replyformat import ReplyFormat
from backend.settings import CONFIG
import logging
import traceback
import os

logger = logging.getLogger("django")

class FileDownloadAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            if self.kwargs.get('path') == None:
                result = ''
            else:
                file_path = os.path.join(CONFIG['root_directory'], self.kwargs.get('path'))
                logger.info(file_path)
                response = FileResponse(open(file_path, 'rb'))
                response['content_type'] = "application/octet-stream"
                response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(file_path)
            return response
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
