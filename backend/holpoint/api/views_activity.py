from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from holpoint.models import Activity, ActivityComment
from .serializers import ActivitySerializer, ActivityCommentSerializer


class ActivityViewSet(viewsets.GenericViewSet, mixins.UpdateModelMixin, mixins.ListModelMixin):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated, ]

    def list(self, request, group_id=None, activity_id=None):
        # /group_activity/<int:group_id>/0
        # 0 can't be a valid activity_id inside the DB
        # so I can use it for this list method
        if group_id:
            group = self.request.user.profile.groups.filter(pk=group_id).first()
            if not group:
                raise NotFound(detail="Group not found", code=404)
            activities = group.activities.all()
            if not activities:
                return Response([], status=status.HTTP_200_OK)
            serializer = self.serializer_class(activities, many=True)
            # Next code line is IMPORTANT!
            # in order to access self.context.get('request')
            # in ProfileRelatedField @serializers.py
            serializer.context['request'] = self.request
            return Response(serializer.data, status=status.HTTP_200_OK)

    def edit(self, request, group_id=None, activity_id=None):
        if group_id and activity_id:
            group = self.request.user.profile.groups.filter(pk=group_id).first()
            if not group:
                raise NotFound(detail="Group not found", code=404)
            activity = group.activities.filter(pk=activity_id).first()
            if not activity:
                raise NotFound(detail="Group not found", code=404)
            request.data['group'] = group_id
            serializer = self.serializer_class(activity, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("error", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActivityCreatorViewSet(mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return self.request.user.profile.created_activities.all()


class ActivityCommentViewSet(mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = ActivityCommentSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return self.request.user.profile.created_comments


class ActivityCommentListView(ListAPIView):
    serializer_class = ActivityCommentSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        activity_id = self.kwargs['activity_id']
        return ActivityComment.objects.filter(to__id=activity_id)
