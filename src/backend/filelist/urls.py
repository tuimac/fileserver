from django.urls import path
from . import views

urlpatterns = [
    path('', views.FileListAPIViews.as_view()),
]
