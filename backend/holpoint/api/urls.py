from django.urls import path
from .views import (
    UserDetailView, BasicUserDetailView, CurrentUserDetailView,
    GroupDetailView, GroupListView
)

urlpatterns = [
    path('profile/<username>', UserDetailView.as_view()),
    path('user/<pk>', BasicUserDetailView.as_view()),
    path('current_user', CurrentUserDetailView.as_view()),
    path('group', GroupListView.as_view()),
    path('group/<pk>', GroupDetailView.as_view()),
]
