from rest_framework import mixins, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView
from rest_framework.exceptions import NotFound
from holpoint.models import FriendRequest
from .serializers import FriendRequestSerializer, CurrentUserFriendRequestSerializer, UserSerializer


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
