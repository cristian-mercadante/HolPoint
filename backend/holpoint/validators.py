import os
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.core.exceptions import ValidationError
from django.conf import settings

from sys import platform
if platform == "win32":
    from winmagic import magic
else:
    import magic


# http://blog.hayleyanderson.us/2015/07/18/validating-file-types-in-django/
def validate_file_type(upload):
    # Make uploaded file accessible for analysis by saving in tmp
    tmp_path = 'tmp/%s' % upload.name[2:]
    default_storage.save(tmp_path, ContentFile(upload.file.read()))
    upload.file.seek(0)  # reset reading
    full_tmp_path = os.path.join(settings.MEDIA_ROOT, tmp_path)
    # Get MIME type of file using python-magic and then delete
    file_type = magic.from_file(full_tmp_path, mime=True)
    default_storage.delete(tmp_path)
    # Raise validation error if uploaded file is not an acceptable form of media
    if file_type not in settings.ALLOWED_FILE_TYPES:
        raise ValidationError('File type not supported.')


def validate_picture_type(upload):
    # Make uploaded file accessible for analysis by saving in tmp
    tmp_path = 'tmp/%s' % upload.name[2:]
    default_storage.save(tmp_path, ContentFile(upload.file.read()))
    upload.file.seek(0)  # reset reading
    full_tmp_path = os.path.join(settings.MEDIA_ROOT, tmp_path)
    # Get MIME type of file using python-magic and then delete
    file_type = magic.from_file(full_tmp_path, mime=True)
    default_storage.delete(tmp_path)
    # Raise validation error if uploaded file is not an acceptable form of media
    if file_type not in settings.ALLOWED_PIC_TYPES:
        raise ValidationError('File type not supported.')
