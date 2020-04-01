from rest_framework import viewsets, mixins, parsers, status, views
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
from holpoint.models import Attachment

from .serializers import AttachmentSerializer
import os

from private_storage.views import PrivateStorageDetailView


class AttachmentUpload(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, ]
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)
    serializer_class = AttachmentSerializer

    # post
    def upload(self, request, group_id=None):
        from holpoint.validators import validate_file_type
        if group_id:
            currentUser = request.user
            if not currentUser:
                raise NotFound(detail="Current user not found", code=404)
            group = currentUser.profile.groups.get(pk=group_id)
            if not group:
                raise NotFound(detail="Group not found", code=404)
            try:
                validate_file_type(request.FILES['file'])
            except:
                return Response({"non_field_errors": "Questo tipo di file non è ammesso"},
                                status=status.HTTP_400_BAD_REQUEST)
            attachment = Attachment.objects.create(group=group, owner=currentUser.profile, name=request.FILES['file'].name)
            serializer = self.serializer_class(attachment, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("error", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AttachmentRemove(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Attachment.objects.all()
    permission_classes = [IsAuthenticated, ]
    serializer_class = AttachmentSerializer

    def remove(self, request, attachment_id=None):
        if attachment_id:
            currentUser = request.user
            if not currentUser:
                raise NotFound(detail="Current user not found", code=404)
            attachment = currentUser.profile.uploaded_attachments.get(pk=attachment_id)
            if not attachment:
                raise NotFound(detail="Attachment not found", code=404)
            file_name = attachment.file.name
            path = "{}/{}".format(settings.PRIVATE_STORAGE_ROOT, file_name)
            if os.path.isfile(path):
                os.remove(path)
            else:
                raise NotFound(detail="Attachment not found", code=404)
            attachment.delete()
            return Response({}, status=status.HTTP_200_OK)


# https://github.com/edoburu/django-private-storage
# https://github.com/edoburu/django-private-storage/issues/24
class AttachmentDetailView(PrivateStorageDetailView, views.APIView):
    model = Attachment
    model_file_field = 'file'
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        # Make sure only certain objects can be accessed.
        # return super().get_queryset().filter(...)
        return super().get_queryset().all()

    def can_access_file(self, private_file):
        # When the object can be accessed, the file may be downloaded.
        # This overrides PRIVATE_STORAGE_AUTH_FUNCTION
        group_id = private_file.parent_object.group_id
        group = self.request.user.profile.groups.filter(pk=group_id)
        if group:
            return True
        else:
            return False
