from rest_framework import serializers
from django.contrib.auth.models import User
from holpoint.models import Profile


class FriendRelatedField(serializers.RelatedField):
    # See https://naveenlabs.com/2018/12/25/custom-serializer-related-field-using-django-rest-framework/
    def get_queryset(self):
        return Profile.objects.all()

    def to_representation(self, value):
        f = Profile.objects.filter(pk=value.pk).first()
        first_name = f.user.first_name
        last_name = f.user.last_name
        username = f.user.username
        return {'pk': value.pk, 'first_name': first_name, 'last_name': last_name, 'username': username}


class ProfileSerializer(serializers.ModelSerializer):
    friends = FriendRelatedField(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = ('friends', 'groups', 'created_ideas', 'user')


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'profile')
