from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from utils.replyformat import ReplyFormat
from .filelist import Filelist
from utils import config
import logging
import traceback

logger = logging.getLogger("django")

class FileListAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            if self.kwargs.get('path') == None:
                result = Filelist.listitems('')
            else:
                result = Filelist.listitems(self.kwargs.get('path'))
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
