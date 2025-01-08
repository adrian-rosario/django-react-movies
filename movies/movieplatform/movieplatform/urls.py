from django.contrib import admin
from django.urls import path, include 

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('movieapp.urls.movie_urls')),
    path('user/', include('movieapp.urls.user_urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
