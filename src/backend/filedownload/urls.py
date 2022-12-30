from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.FileDownloadAPIViews.as_view()),
    re_path(r'^(?P<path>.*)/$', views.FileDownloadAPIViews.as_view())
]
