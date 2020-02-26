from rest_framework.generics import RetrieveAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from .serializers import UserSerializer


class UserDetailView(RetrieveAPIView):
    lookup_field = 'username'
    permission_classes = [IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class = UserSerializer
