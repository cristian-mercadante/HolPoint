from django.urls import path
from .views import (
    UserDetailView, BasicUserDetailView, CurrentUserDetailView,
)

from .views import GroupViewSet
from rest_framework.routers import DefaultRouter

group_router = DefaultRouter()
group_router.register(r'group', GroupViewSet, basename="group")

urlpatterns = [
    path('profile/<username>', UserDetailView.as_view()),
    path('user/<pk>', BasicUserDetailView.as_view()),
    path('current_user', CurrentUserDetailView.as_view()),
]

urlpatterns += group_router.urls
