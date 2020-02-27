from rest_framework import serializers
from django.contrib.auth.models import User
from holpoint.models import Profile, Group


class ProfileRelatedField(serializers.RelatedField):
    # See https://naveenlabs.com/2018/12/25/custom-serializer-related-field-using-django-rest-framework/
    def get_queryset(self):
        return Profile.objects.all()

    def to_representation(self, value):
        p = Profile.objects.filter(pk=value.pk).first()
        first_name = p.user.first_name
        last_name = p.user.last_name
        username = p.user.username
        return {'id': value.pk, 'first_name': first_name, 'last_name': last_name, 'username': username}


class ProfileSerializer(serializers.ModelSerializer):
    friends = ProfileRelatedField(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = ('friends', 'user')


class GroupSerializer(serializers.ModelSerializer):
    creator = ProfileRelatedField(read_only=True)
    profiles = ProfileRelatedField(read_only=True, many=True)
    admins = ProfileRelatedField(read_only=True, many=True)

    class Meta:
        model = Group
        fields = ('name', 'date_creation', 'is_active', 'creator', 'profiles', 'admins')


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'profile')


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')
