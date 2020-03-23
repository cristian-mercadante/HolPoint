import uuid
import os
from django.conf import settings

from rest_framework import viewsets, mixins, views, parsers, status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    DestroyAPIView,
    RetrieveUpdateAPIView
)

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializers import (
    UserSerializer,
    CurrentUserSerializer,
    BasicUserSerializer,
    FriendRequestSerializer,
    GroupSerializer,
    GroupCreatorSerializer,
    IdeaSerializer,
    IdeaCommentSerializer,
    VoteIdeaInGroupSerializer,
    CurrentUserFriendRequestSerializer,
    PictureSerializer,
    ActivitySerializer,
    ActivityCommentSerializer,
    AttachmentSerializer,
)

from django.contrib.auth.models import User
from holpoint.models import (
    Profile,
    FriendRequest,
    Group,
    Idea,
    IdeaComment,
    VoteIdeaInGroup,
    Activity,
    ActivityComment,
    Attachment,
)

from private_storage.views import PrivateStorageDetailView


class CurrentUserDetailView(RetrieveUpdateAPIView):
    lookup_field = 'username'
    permission_classes = [IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = CurrentUserSerializer

    def get_object(self):
        return self.request.user


class UserDetailView(RetrieveAPIView):
    lookup_field = 'username'
    permission_classes = [IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SearchUser(ListAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = BasicUserSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        # limit to 10 results
        return User.objects.filter(username__contains=username)[:10]


class FriendRequestViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return FriendRequest.objects.all()


class CurrentUserFriendRequestDetailView(RetrieveAPIView):
    serializer_class = CurrentUserFriendRequestSerializer
    permission_classes = [IsAuthenticated, ]

    def get_object(self):
        return self.request.user.profile


# FIXME: do I need it???
class UserBasicDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = BasicUserSerializer


class GroupViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return self.request.user.profile.groups.all()


class GroupCreatorViewSet(mixins.DestroyModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupCreatorSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return self.request.user.profile.created_groups.all()


class IdeaViewSet(viewsets.ModelViewSet):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return self.request.user.profile.ideas.all()


class IdeaCommentViewSet(mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = IdeaCommentSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return self.request.user.profile.created_comments


class IdeaCommentListView(ListAPIView):
    serializer_class = IdeaCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        idea_id = self.kwargs['idea_id']
        return IdeaComment.objects.filter(to__id=idea_id)


class ActivityCommentViewSet(mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = ActivityCommentSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return self.request.user.profile.created_comments


class ActivityCommentListView(ListAPIView):
    serializer_class = ActivityCommentSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        activity_id = self.kwargs['activity_id']
        return ActivityComment.objects.filter(to__id=activity_id)


class VoteIdeaInGroupViewSet(viewsets.ModelViewSet):
    serializer_class = VoteIdeaInGroupSerializer
    permission_classes = [IsAuthenticated, ]

    def vote(self, request, group_id=None, idea_id=None):
        if group_id and idea_id:
            group = Group.objects.filter(pk=group_id).first()
            if not group:
                raise NotFound(detail="Group not found", code=404)
            idea = Idea.objects.filter(pk=idea_id).first()
            if not idea:
                raise NotFound(detail="Idea not found", code=404)
            profile = request.user.profile
            vote = VoteIdeaInGroup.objects.filter(group=group, idea=idea, votes__id=profile.id).first()
            if vote:
                vote.votes.remove(profile.id)
            else:
                vote = VoteIdeaInGroup.objects.get_or_create(group=group, idea=idea)[0]
                vote.votes.add(profile.id)
                vote.save()
            serializer = self.serializer_class(vote)
            return Response(serializer.data)


class UnfriendViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, ]

    def unfriend(self, request, friend_id=None):
        if friend_id:
            currentUser = request.user
            if not currentUser:
                raise NotFound(detail="Current user not found", code=404)
            friend = currentUser.profile.friends.filter(pk=friend_id).first()
            if not friend:
                raise NotFound(detail="Friend not found", code=404)
            currentUser.profile.friends.remove(friend)
            currentUser.save()
            serializer = self.serializer_class(currentUser)
            return Response(serializer.data)


class PictureUpload(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, ]
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)
    serializer_class = PictureSerializer

    def upload(self, request):
        currentUser = request.user
        if not currentUser:
            raise NotFound(detail="Current user not found", code=404)
        profile = currentUser.profile
        # remove old pic
        image_path = "{}/{}".format(settings.MEDIA_ROOT, currentUser.profile.picture.name)
        if os.path.isfile(image_path):
            os.remove(image_path)
        # rename new pic
        old_name = request.FILES['picture'].name
        filename, file_extension = os.path.splitext(old_name)
        request.FILES['picture'].name = "{}{}".format(str(uuid.uuid4()), file_extension)
        # response
        serializer = self.serializer_class(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("error", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AttachmentUpload(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, ]
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)
    serializer_class = AttachmentSerializer

    # post
    def upload(self, request, group_id=None):
        from holpoint.validators import validate_file_type
        if group_id:
            currentUser = request.user
            if not currentUser:
                raise NotFound(detail="Current user not found", code=404)
            group = currentUser.profile.groups.get(pk=group_id)
            if not group:
                raise NotFound(detail="Group not found", code=404)
            try:
                validate_file_type(request.FILES['file'])
            except:
                return Response({"non_field_errors": "Questo tipo di file non è ammesso"},
                                status=status.HTTP_400_BAD_REQUEST)
            attachment = Attachment.objects.create(group=group, owner=currentUser.profile, name=request.FILES['file'].name)
            serializer = self.serializer_class(attachment, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("error", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AttachmentRemove(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Attachment.objects.all()
    permission_classes = [IsAuthenticated, ]
    serializer_class = AttachmentSerializer

    def remove(self, request, attachment_id=None):
        if attachment_id:
            currentUser = request.user
            if not currentUser:
                raise NotFound(detail="Current user not found", code=404)
            attachment = currentUser.profile.uploaded_attachments.get(pk=attachment_id)
            if not attachment:
                raise NotFound(detail="Attachment not found", code=404)
            file_name = attachment.file.name
            path = "{}/{}".format(settings.PRIVATE_STORAGE_ROOT, file_name)
            if os.path.isfile(path):
                os.remove(path)
            else:
                raise NotFound(detail="Attachment not found", code=404)
            attachment.delete()
            return Response({}, status=status.HTTP_200_OK)


class QueryStringBasedTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        # Check if 'token_auth' is in the request query params.
        # Give precedence to 'Authorization' header.
        if 'auth_token' in request.query_params and \
                'HTTP_AUTHORIZATION' not in request.META:
            return self.authenticate_credentials(request.query_params.get('auth_token'))
        else:
            return super(TokenAuthSupportQueryString, self).authenticate(request)

# https://github.com/edoburu/django-private-storage
# https://github.com/edoburu/django-private-storage/issues/24


class AttachmentDetailView(PrivateStorageDetailView, views.APIView):
    model = Attachment
    model_file_field = 'file'
    authentication_classes = [QueryStringBasedTokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        # Make sure only certain objects can be accessed.
        # return super().get_queryset().filter(...)
        return super().get_queryset().all()

    def can_access_file(self, private_file):
        # When the object can be accessed, the file may be downloaded.
        # This overrides PRIVATE_STORAGE_AUTH_FUNCTION
        group_id = private_file.parent_object.group_id
        group = self.request.user.profile.groups.filter(pk=group_id)
        if group:
            return True
        else:
            return False


class ActivityViewSet(viewsets.GenericViewSet, mixins.UpdateModelMixin, mixins.ListModelMixin):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated, ]

    def list(self, request, group_id=None, activity_id=None):
        # /group_activity/<int:group_id>/0
        # 0 can't be a valid activity_id inside the DB
        # so I can use it for this list method
        if group_id:
            group = self.request.user.profile.groups.filter(pk=group_id).first()
            if not group:
                raise NotFound(detail="Group not found", code=404)
            activities = group.activities.all()
            if not activities:
                return Response([], status=status.HTTP_200_OK)
            serializer = self.serializer_class(activities, many=True)
            # Next code line is IMPORTANT!
            # in order to access self.context.get('request')
            # in ProfileRelatedField @serializers.py
            serializer.context['request'] = self.request
            return Response(serializer.data, status=status.HTTP_200_OK)

    def edit(self, request, group_id=None, activity_id=None):
        if group_id and activity_id:
            group = self.request.user.profile.groups.filter(pk=group_id).first()
            if not group:
                raise NotFound(detail="Group not found", code=404)
            activity = group.activities.filter(pk=activity_id).first()
            if not activity:
                raise NotFound(detail="Group not found", code=404)
            serializer = self.serializer_class(activity, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("error", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActivityCreatorViewSet(mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return self.request.user.profile.created_activities.all()
