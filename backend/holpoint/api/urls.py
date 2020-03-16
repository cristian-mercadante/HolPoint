from django.urls import path
from .views import (
    UserDetailView,
    SearchUser,
    UserBasicDetailView,
    CurrentUserDetailView,
    IdeaCommentListView,
    CurrentUserFriendRequestDetailView,
)

from .views import (
    GroupViewSet,
    IdeaViewSet,
    IdeaCommentViewSet,
    VoteIdeaInGroupViewSet,
    FriendRequestViewSet,
    UnfriendViewSet
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'group', GroupViewSet, basename="group")
router.register(r'idea', IdeaViewSet, basename="idea")
router.register(r'comment/idea', IdeaCommentViewSet, basename="comment_idea")
router.register(r'friendrequest', FriendRequestViewSet, basename="friend_request")

urlpatterns = [
    path('profile/<username>', UserDetailView.as_view()),
    path('search/user/<username>', SearchUser.as_view()),
    path('user/<pk>', UserBasicDetailView.as_view()),
    path('current_user', CurrentUserDetailView.as_view()),
    path('comment/idea/<idea_id>', IdeaCommentListView.as_view()),
    path('vote/<group_id>/<idea_id>', VoteIdeaInGroupViewSet.as_view({'post': 'vote'})),
    path('friendrequests', CurrentUserFriendRequestDetailView.as_view()),
    path('unfriend/<int:friend_id>', UnfriendViewSet.as_view({'delete': 'unfriend'})),
]

urlpatterns += router.urls
