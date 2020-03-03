from django.urls import path
from .views import (
    UserDetailView, UserBasicDetailView, CurrentUserDetailView,
)

from .views import GroupViewSet, IdeaViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'group', GroupViewSet, basename="group")
router.register(r'idea', IdeaViewSet, basename="idea")

urlpatterns = [
    path('profile/<username>', UserDetailView.as_view()),
    path('user/<pk>', UserBasicDetailView.as_view()),
    path('current_user', CurrentUserDetailView.as_view()),
]

urlpatterns += router.urls
