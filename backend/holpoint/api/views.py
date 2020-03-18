from rest_framework import viewsets, mixins, views
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    DestroyAPIView,
    RetrieveUpdateAPIView
)

#from rest_framework.authentication import TokenAuthentication
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
)

from django.contrib.auth.models import User
from holpoint.models import (
    Profile,
    FriendRequest,
    Group,
    Idea,
    IdeaComment,
    VoteIdeaInGroup,
)


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
