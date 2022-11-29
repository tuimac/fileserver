from django.urls import path, include

urlpatterns = [
    path("api/sendpacket/", include("sendpacket.urls")),
    path("api/ping/", include("ping.urls")),
    path("api/arp/", include("arp.urls")),
    path("api/interface/", include("interface.urls"))
]
