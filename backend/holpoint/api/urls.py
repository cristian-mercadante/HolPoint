from django.urls import path
from .views import UserDetailView

urlpatterns = [
    path('profile/<username>', UserDetailView.as_view()),
]
