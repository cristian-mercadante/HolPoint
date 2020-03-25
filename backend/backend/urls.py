from django.contrib import admin
from django.urls import include, path, re_path
import private_storage.urls
from holpoint import views
from django.views.generic import TemplateView
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView


urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('', include('holpoint.urls')),
    path('api/', include('holpoint.api.urls')),
    path('private-media/', include(private_storage.urls)),
    path('reset-password/', PasswordResetView.as_view(), name='password_reset'),
    path('resert-password/done/', PasswordResetDoneView.as_view(), name='password_reset_done'),
    re_path(r'^reset-password/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset-password/complete/', PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('', TemplateView.as_view(template_name='index.html')),
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
]
