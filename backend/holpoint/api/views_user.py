from rest_framework import viewsets, mixins, parsers, status
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
from django.contrib.auth.models import User
from .serializers import CurrentUserSerializer, UserSerializer, BasicUserSerializer, PictureSerializer
from holpoint.validators import validate_picture_type
import uuid
import os
import json
import copy


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


class PictureUpload(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, ]
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)
    serializer_class = PictureSerializer

    def upload(self, request):
        currentUser = request.user
        if not currentUser:
            raise NotFound(detail="Current user not found", code=404)
        file = request.data['picture']
        try:
            validate_picture_type(file)
        except:
            return Response({"non_field_errors": "Questo tipo di file non è ammesso"},
                            status=status.HTTP_400_BAD_REQUEST)
        profile = currentUser.profile
        # remove old pic
        image_path = "{}/{}".format(settings.MEDIA_ROOT, currentUser.profile.picture.name)
        if os.path.isfile(image_path):
            os.remove(image_path)
        # rename new pic
        filename, file_extension = os.path.splitext(request.data['picture'].name)
        request.data['picture'].name = "{}{}".format(str(uuid.uuid4()), file_extension)
        # response
        serializer = self.serializer_class(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("error", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
