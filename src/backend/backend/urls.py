from django.urls import path, include

urlpatterns = [
    path("api/filelist/", include("filelist.urls"))
]
