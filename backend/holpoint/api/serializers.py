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
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=False)
    date_creation = serializers.DateField(read_only=True)
    is_active = serializers.BooleanField(default=True, read_only=True)
    creator = serializers.PrimaryKeyRelatedField(read_only=True, required=False)
    users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)

    class Meta:
        model = Group
        fields = ('id', 'name', 'description', 'date_creation', 'is_active', 'creator', 'users')

    def create(self, validated_data):
        current_user = self.context['request'].user.id
        creator = User.objects.filter(id=current_user).first()
        group = Group.objects.create(**validated_data, creator=creator)
        group.save()
        creator.holiday_groups.add(group)
        creator.save()
        return group


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'profile', 'holiday_groups')


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')
