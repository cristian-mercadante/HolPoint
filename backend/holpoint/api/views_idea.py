from rest_framework import mixins, viewsets
from holpoint.models import Idea, IdeaComment
from .serializers import IdeaSerializer, IdeaCommentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView


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
