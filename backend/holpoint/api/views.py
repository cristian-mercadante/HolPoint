from rest_framework.generics import RetrieveAPIView
from django.contrib.auth.models import User
from .serializers import UserSerializer


class UserDetailView(RetrieveAPIView):
    lookup_field = 'username'
    queryset = User.objects.all()
    serializer_class = UserSerializer
