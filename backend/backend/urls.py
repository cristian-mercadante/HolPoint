from django.contrib import admin
from django.urls import include, path
import private_storage.urls


urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('', include('holpoint.urls')),
    path('api/', include('holpoint.api.urls')),
    path('private-media/', include(private_storage.urls)),
]
