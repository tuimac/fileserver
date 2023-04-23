from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.FileListAPIViews.as_view()),
    re_path(r'^filesize(?P<path>.*)/$', views.FileListSizeAPIViews.as_view()),
    re_path(r'^(?P<path>.*)/$', views.FileListAPIViews.as_view())
]
