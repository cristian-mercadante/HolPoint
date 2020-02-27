from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from .serializers import (
    UserSerializer,
    BasicUserSerializer,
    CurrentUserSerializer,
    GroupSerializer)

from holpoint.models import Group


class CurrentUserDetailView(RetrieveAPIView):
    lookup_field = 'username'
    permission_classes = [IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = CurrentUserSerializer

    def get_object(self):
        return self.request.user


class UserDetailView(RetrieveAPIView):
    lookup_field = 'username'
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BasicUserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = BasicUserSerializer


class GroupListView(ListAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class GroupDetailView(RetrieveAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
