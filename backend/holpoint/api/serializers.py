from rest_framework import serializers
from django.contrib.auth.models import User
from holpoint.models import Profile, Group, Idea, IdeaComment, VoteIdeaInGroup


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


class IdeaInGroupSerializer(serializers.ModelSerializer):
    date_creation = serializers.DateField(read_only=True, format="%d/%m/%Y")
    creator = ProfileRelatedField(read_only=True, required=False)

    class Meta:
        model = Idea
        fields = '__all__'

    def to_internal_value(self, data):
        try:
            try:
                idea_id = data
                return Idea.objects.get(id=idea_id)
            except KeyError:
                raise serializers.ValidationError(
                    'id is a required field.'
                )
            except ValueError:
                raise serializers.ValidationError(
                    'id must be an integer.'
                )
        except Idea.DoesNotExist:
            raise serializers.ValidationError(
                'Obj does not exist.'
            )


class IdeaSerializer(serializers.ModelSerializer):
    date_creation = serializers.DateField(read_only=True, format="%d/%m/%Y")
    creator = ProfileRelatedField(read_only=True, required=False)

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


class VoteIdeaInGroupSerializer(serializers.ModelSerializer):
    votes = ProfileRelatedField(read_only=True, many=True)

    class Meta:
        model = VoteIdeaInGroup
        fields = ('idea', 'group', 'votes')


class GroupSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=False)
    date_creation = serializers.DateField(read_only=True, format="%d/%m/%Y")
    date_start = serializers.DateField(required=False, format="%d/%m/%Y")
    date_finish = serializers.DateField(required=False, format="%d/%m/%Y")
    is_active = serializers.BooleanField(default=True, read_only=True)
    creator = ProfileRelatedField(read_only=True, required=False)
    profiles = ProfileRelatedField(queryset=Profile.objects.all(), many=True, required=False)
    prefered_idea = serializers.PrimaryKeyRelatedField(queryset=Idea.objects.all(), required=False)
    ideas = IdeaInGroupSerializer(many=True, required=False)
    group_to_idea = VoteIdeaInGroupSerializer(many=True, required=False)

    class Meta:
        model = Group
        fields = ('id', 'name', 'description', 'date_creation', 'date_start', 'date_finish', 'prefered_idea', 'is_active', 'creator', 'profiles', 'ideas', 'group_to_idea')

    def create(self, validated_data):
        current_user = self.context['request'].user.id
        creator = Profile.objects.filter(user=current_user).first()
        profiles = [Profile.objects.filter(user=p.id).first() for p in validated_data.get("profiles")]
        validated_data.pop("profiles")
        group = Group.objects.create(**validated_data, creator=creator)
        group.profiles.set(profiles)
        return group

    def update(self, instance, validated_data):
        profiles = [Profile.objects.filter(user=p.id).first() for p in validated_data.get("profiles")]
        if validated_data.get("ideas") or len(validated_data.get("ideas")) == 0:
            ideaIds = [i.id for i in validated_data.get("ideas")]
            ideas = [Idea.objects.filter(pk=i).first() for i in ideaIds]
            instance.ideas.set(ideas)
        creator = instance.creator
        # creator must not be removed from profiles
        if creator not in profiles:
            profiles.append(creator)
        validated_data.pop("profiles")
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.profiles.set(profiles)
        instance.save()
        return instance


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
