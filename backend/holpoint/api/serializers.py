from rest_framework import serializers
from django.contrib.auth.models import User
from holpoint.models import Profile, Group, Idea, IdeaComment


class ProfileRelatedField(serializers.RelatedField):
    # See https://naveenlabs.com/2018/12/25/custom-serializer-related-field-using-django-rest-framework/
    def get_queryset(self):
        return Profile.objects.all()

    def to_internal_value(self, data):
        try:
            try:
                profile_id = data
                return Profile.objects.get(id=profile_id)
            except KeyError:
                raise serializers.ValidationError(
                    'id is a required field.'
                )
            except ValueError:
                raise serializers.ValidationError(
                    'id must be an integer.'
                )
        except Profile.DoesNotExist:
            raise serializers.ValidationError(
                'Obj does not exist.'
            )

    def to_representation(self, value):
        p = Profile.objects.filter(pk=value.pk).first()
        first_name = p.user.first_name
        last_name = p.user.last_name
        username = p.user.username
        email = p.user.email
        return {'id': value.pk, 'first_name': first_name, 'last_name': last_name, 'username': username, 'email': email}


class IdeaSerializer(serializers.ModelSerializer):
    date_creation = serializers.DateField(read_only=True, format="%d/%m/%Y")
    date_start = serializers.DateField(required=False, format="%d/%m/%Y")
    date_finish = serializers.DateField(required=False, format="%d/%m/%Y")
    creator = serializers.PrimaryKeyRelatedField(read_only=True, required=False)

    class Meta:
        model = Idea
        fields = '__all__'

    def create(self, validated_data):
        current_user = self.context['request'].user.id
        creator = Profile.objects.filter(user=current_user).first()
        idea = Idea.objects.create(**validated_data, creator=creator)
        return idea


class ProfileSerializer(serializers.ModelSerializer):
    friends = ProfileRelatedField(read_only=True, many=True)
    ideas = IdeaSerializer(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = ('friends', 'groups', 'user', 'ideas')


class GroupSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=False)
    date_creation = serializers.DateField(read_only=True, format="%d/%m/%Y")
    is_active = serializers.BooleanField(default=True, read_only=True)
    creator = ProfileRelatedField(read_only=True, required=False)
    profiles = ProfileRelatedField(queryset=Profile.objects.all(), many=True, required=False)

    class Meta:
        model = Group
        fields = ('id', 'name', 'description', 'date_creation', 'is_active', 'creator', 'profiles')

    def create(self, validated_data):
        current_user = self.context['request'].user.id
        creator = Profile.objects.filter(user=current_user).first()
        profiles = [Profile.objects.filter(user=p.id).first() for p in validated_data.get("profiles")]
        validated_data.pop("profiles")
        group = Group.objects.create(**validated_data, creator=creator)
        group.profiles.set(profiles)
        return group


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'profile')


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class IdeaCommentSerializer(serializers.ModelSerializer):
    creator = ProfileRelatedField(read_only=True, required=False)
    datetime = serializers.DateTimeField(read_only=True, format="%d/%m/%Y %H:%M")

    class Meta:
        model = IdeaComment
        fields = '__all__'

    def create(self, validated_data):
        current_user = self.context['request'].user.id
        creator = Profile.objects.filter(user=current_user).first()
        comment = IdeaComment.objects.create(**validated_data, creator=creator)
        return comment
