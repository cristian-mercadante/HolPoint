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


class GroupRelatedField(serializers.RelatedField):
    def get_queryset(self):
        return Group.objects.all()

    def to_representation(self, value):
        g = Group.objects.filter(pk=value.pk).first()
        creator = ProfileRelatedField(read_only=True).to_representation(g.creator)
        representation = {
            'id': value.pk,
            "name": g.name,
            "date_creation": g.date_creation.strftime("%d/%m/%Y"),
            "is_active": g.is_active,
            "creator": creator,
        }
        return representation


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


class CurrentProfileSerializer(serializers.ModelSerializer):
    friends = ProfileRelatedField(read_only=True, many=True)
    groups = GroupRelatedField(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = ('friends', 'groups', 'created_ideas', 'user')


class CurrentUserSerializer(serializers.ModelSerializer):
    profile = CurrentProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'profile')


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')
