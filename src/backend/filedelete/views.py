from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from utils.replyformat import ReplyFormat
import logging
import traceback
from .filedelete import Filedelete

logger = logging.getLogger("django")

class FileDeleteAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def post(self, request, *args, **kwargs):
        try:
            logger.info(request.data)
            if self.kwargs.get('path') == None:
                logger.debug(self.kwargs.get('path'))
                Filedelete.deletefiles('', request.data['filelist'])
            else:
                Filedelete.deletefiles(self.kwargs.get('path'), request.data['filelist'])
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