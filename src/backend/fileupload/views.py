from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from utils.replyformat import ReplyFormat
import logging
import traceback
from .fileupload import Fileupload

logger = logging.getLogger("django")

class FileUploadAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def post(self, request, *args, **kwargs):
        try:
            for filename in request.data:
                if self.kwargs.get('path') == None:
                    Fileupload.writefile('', filename, request.data[filename])
                else:
                    Fileupload.writefile(self.kwargs.get('path'), filename, request.data[filename])
            return Response(
                ReplyFormat.status_200('uploaded'),
                status=status.HTTP_200_OK
            )
        except FileNotFoundError:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_404(message),
                status=status.HTTP_404_NOT_FOUND
            )
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )