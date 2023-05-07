from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.FileUploadAPIViews.as_view()),
    re_path(r'^(?P<path>.*)/$', views.FileUploadAPIViews.as_view())
]
