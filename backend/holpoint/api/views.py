from rest_framework import viewsets, mixins
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
    BasicUserSerializer,
    GroupSerializer,
    IdeaSerializer,
    IdeaCommentSerializer,
)

from django.contrib.auth.models import User
from holpoint.models import Group, Idea, IdeaComment


class CurrentUserDetailView(RetrieveUpdateAPIView):
    lookup_field = 'username'
    permission_classes = [IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserDetailView(RetrieveAPIView):
    # same as CurrentUserDetailView, but without authentication
    lookup_field = 'username'
    queryset = User.objects.all()
    serializer_class = UserSerializer


# FIXME: do I need it???
class UserBasicDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = BasicUserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return self.request.user.profile.groups.all()


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
