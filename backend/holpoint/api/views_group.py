from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from holpoint.models import Group, Idea, VoteIdeaInGroup
from .serializers import GroupSerializer, GroupCreatorSerializer, VoteIdeaInGroupSerializer


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
