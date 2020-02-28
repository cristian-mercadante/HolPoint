from rest_framework.generics import RetrieveAPIView, ListAPIView
#from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

from django.contrib.auth.models import User
from .serializers import (
    UserSerializer,
    BasicUserSerializer,
    GroupSerializer,
)

from holpoint.models import Group


class CurrentUserDetailView(RetrieveAPIView):
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
class BasicUserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = BasicUserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return self.request.user.holiday_groups.all()
