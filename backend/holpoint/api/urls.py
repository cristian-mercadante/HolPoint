from django.urls import path
from .views import (
    UserDetailView,
    SearchUser,
    UserBasicDetailView,
    CurrentUserDetailView,
    IdeaCommentListView,
    CurrentUserFriendRequestDetailView,
    PictureUpload,
    ActivityCommentListView,
    AttachmentUpload,
    AttachmentDetailView,
    AttachmentRemove,
)

from .views import (
    GroupViewSet,
    GroupCreatorViewSet,
    IdeaViewSet,
    IdeaCommentViewSet,
    VoteIdeaInGroupViewSet,
    FriendRequestViewSet,
    UnfriendViewSet,
    ActivityViewSet,
    ActivityCreatorViewSet,
    ActivityCommentViewSet
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'group', GroupViewSet, basename="group")
router.register(r'group_creator', GroupCreatorViewSet, basename="group_creator")
router.register(r'activity_creator', ActivityCreatorViewSet, basename="activity_creator")
router.register(r'idea', IdeaViewSet, basename="idea")
router.register(r'comment/idea', IdeaCommentViewSet, basename="comment_idea")
router.register(r'friendrequest', FriendRequestViewSet, basename="friend_request")
router.register(r'comment/activity', ActivityCommentViewSet, basename="comment_activity")

urlpatterns = [
    path('profile/<username>', UserDetailView.as_view()),
    path('search/user/<username>', SearchUser.as_view()),
    path('user/<pk>', UserBasicDetailView.as_view()),
    path('current_user', CurrentUserDetailView.as_view()),
    path('comment/idea/<idea_id>', IdeaCommentListView.as_view()),
    path('vote/<group_id>/<idea_id>', VoteIdeaInGroupViewSet.as_view({'post': 'vote'})),
    path('friendrequests', CurrentUserFriendRequestDetailView.as_view()),
    path('unfriend/<int:friend_id>', UnfriendViewSet.as_view({'delete': 'unfriend'})),
    path('pictureupload', PictureUpload.as_view({'put': 'upload'})),
    path('group_activity/<int:group_id>/<int:activity_id>', ActivityViewSet.as_view({'get': 'list', 'put': 'edit'})),
    path('comment/activity/<activity_id>', ActivityCommentListView.as_view()),
    path('attachmentupload/<int:group_id>', AttachmentUpload.as_view({'post': 'upload'})),
    path('attachment/<int:pk>', AttachmentDetailView.as_view()),
    path('attachmentremove/<int:attachment_id>', AttachmentRemove.as_view({'delete': 'remove'})),
]

urlpatterns += router.urls
