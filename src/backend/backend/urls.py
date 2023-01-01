from django.urls import path, include

urlpatterns = [
    path("api/filelist/", include("filelist.urls")),
    path("api/filedownload/", include("filedownload.urls")),
    path("api/filepreview/", include("filepreview.urls"))
]
