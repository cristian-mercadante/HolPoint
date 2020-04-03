from django.urls import path
from .views_group import GroupViewSet, GroupCreatorViewSet, VoteIdeaInGroupViewSet
from .views_idea import IdeaViewSet, IdeaCommentViewSet, IdeaCommentListView
from .views_user import UserDetailView, SearchUser, CurrentUserDetailView, PictureUpload, PictureUploadMobile
from .views_friendrequest import FriendRequestViewSet, CurrentUserFriendRequestDetailView, UnfriendViewSet
from .views_activity import ActivityViewSet, ActivityCreatorViewSet, ActivityCommentViewSet, ActivityCommentListView
from .views_attachment import AttachmentUpload, AttachmentDetailView, AttachmentRemove

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'group', GroupViewSet, basename="group")
router.register(r'group_creator', GroupCreatorViewSet, basename="group_creator")
router.register(r'activity_creator', ActivityCreatorViewSet, basename="activity_creator")
router.register(r'idea', IdeaViewSet, basename="idea")
router.register(r'comment/idea', IdeaCommentViewSet, basename="comment_idea")
router.register(r'friendrequest', FriendRequestViewSet, basename="friendrequest")
router.register(r'comment/activity', ActivityCommentViewSet, basename="comment_activity")

urlpatterns = [
    path('profile/<username>', UserDetailView.as_view(), name="profile"),
    path('search/user/<username>', SearchUser.as_view(), name="search_user"),
    path('current_user', CurrentUserDetailView.as_view(), name="current_user"),
    path('comment/idea/<idea_id>', IdeaCommentListView.as_view(), name="comment_idea"),
    path('vote/<group_id>/<idea_id>', VoteIdeaInGroupViewSet.as_view({'post': 'vote'}), name="vote_idea"),
    path('friendrequests', CurrentUserFriendRequestDetailView.as_view(), name="current_user_friendrequests"),
    path('unfriend/<int:friend_id>', UnfriendViewSet.as_view({'delete': 'unfriend'}), name="unfriend"),
    path('pictureupload', PictureUpload.as_view({'put': 'upload'}), name="pictureupload"),
    path('pictureuploadmobile', PictureUploadMobile.as_view({'put': 'upload'}, name="pictureuploadmobile")),
    path('group_activity/<int:group_id>/<int:activity_id>', ActivityViewSet.as_view({'get': 'list', 'put': 'edit'}), name="activity"),
    path('comment/activity/<activity_id>', ActivityCommentListView.as_view(), name="comment_activity"),
    path('attachmentupload/<int:group_id>', AttachmentUpload.as_view({'post': 'upload'}), name="attachmentupload"),
    path('attachment/<int:pk>', AttachmentDetailView.as_view(), name="attachmentdetail"),
    path('attachmentremove/<int:attachment_id>', AttachmentRemove.as_view({'delete': 'remove'}), name="attachementremove"),
]

urlpatterns += router.urls
