from django.contrib import admin
from django.urls import include, path, re_path
import private_storage.urls
from holpoint import views
from django.views.generic import TemplateView


urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('', include('holpoint.urls')),
    path('api/', include('holpoint.api.urls')),
    path('private-media/', include(private_storage.urls)),
    path('', TemplateView.as_view(template_name='index.html')),
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
]
