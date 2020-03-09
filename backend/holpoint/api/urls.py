from django.urls import path
from .views import (
    UserDetailView,
    UserBasicDetailView,
    CurrentUserDetailView,
    IdeaCommentListView,
)

from .views import GroupViewSet, IdeaViewSet, IdeaCommentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'group', GroupViewSet, basename="group")
router.register(r'idea', IdeaViewSet, basename="idea")
router.register(r'comment/idea', IdeaCommentViewSet, basename="comment_idea")

urlpatterns = [
    path('profile/<username>', UserDetailView.as_view()),
    path('user/<pk>', UserBasicDetailView.as_view()),
    path('current_user', CurrentUserDetailView.as_view()),
    path('comment/idea/<idea_id>', IdeaCommentListView.as_view()),
]

urlpatterns += router.urls
