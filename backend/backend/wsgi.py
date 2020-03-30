"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os
import sys

path='/home/pi/HolPoint/backend'
if path not in sys.path:
    sys.path.append(path)

from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
application = get_wsgi_application()

from django.contrib.auth.handlers.modwsgi import check_password