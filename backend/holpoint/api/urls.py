from django.urls import path
from .views import UserDetailView, CurrentUserDetailView

urlpatterns = [
    path('profile/<username>', UserDetailView.as_view()),
    path('current_user', CurrentUserDetailView.as_view()),
]
