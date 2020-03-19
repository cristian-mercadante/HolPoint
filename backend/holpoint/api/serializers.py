from rest_framework import serializers, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from holpoint.models import (
    Profile,
    FriendRequest,
    Group,
    Idea,
    IdeaComment,
    VoteIdeaInGroup,
)


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


class IdeaRelatedField(serializers.RelatedField):
    def get_queryset(self):
        return Idea.objects.all()

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

    def to_representation(self, value):
        idea = Idea.objects.filter(pk=value.pk).first()
        date_creation = idea.date_creation.strftime("%d/%m/%Y")
        creator = ProfileRelatedField().to_representation(idea.creator)
        title = idea.title
        description = idea.description

        return {
            'id': value.pk,
            'date_creation': date_creation,
            'creator': creator,
            'title': title,
            'description': description,
        }


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


class FriendRequestSerializer(serializers.ModelSerializer):
    sender = ProfileRelatedField()
    receiver = ProfileRelatedField()
    status = serializers.ChoiceField(choices=['Acc', 'Pen', 'Ref'], default='Pen')

    class Meta:
        model = FriendRequest
        fields = '__all__'

    def create(self, validated_data):
        # we override create method in order to ensure that:
        # - the sender is the current user
        # - the status is Pen
        sender = validated_data.get("sender")
        receiver = validated_data.get("receiver")
        friend = sender.friends.filter(pk=receiver.id)
        if friend:
            raise serializers.ValidationError('You are already friends')
        fr_ = FriendRequest.objects.filter(sender=receiver, receiver=sender).first()
        if fr_:
            raise serializers.ValidationError('Request already done by the receiver')
        if self.context["request"].user.profile.id != sender.id:
            raise serializers.ValidationError('Unable to do this request')
        fr = FriendRequest.objects.create(sender=sender, receiver=receiver, status="Pen")
        return fr

    def update(self, instance, validated_data):
        sender = validated_data.get("sender")
        receiver = validated_data.get("receiver")
        new_status = validated_data.get("status")
        if sender.id == instance.sender.id and self.context['request'].user.profile.id == instance.receiver.id:
            instance.status = new_status
            if new_status == "Acc":
                instance.sender.friends.add(instance.receiver)
                instance.receiver.friends.add(instance.sender)
            self.perform_destroy(instance)
        return instance

    def perform_destroy(self, instance):
        instance.delete()


class CurrentUserFriendRequestSerializer(serializers.ModelSerializer):
    sent_requests = FriendRequestSerializer(read_only=True, many=True)
    received_requests = FriendRequestSerializer(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = ('sent_requests', 'received_requests')


class ProfileSerializer(serializers.ModelSerializer):
    friends = ProfileRelatedField(read_only=True, many=True)
    ideas = IdeaSerializer(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = ('friends', 'user', 'ideas')


class CurrentUserProfileSerializer(serializers.ModelSerializer):
    friends = ProfileRelatedField(read_only=True, many=True)
    ideas = IdeaSerializer(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = ('friends', 'user', 'ideas')


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
    date_start = serializers.DateField(required=False, format="%d/%m/%Y", allow_null=True)
    date_finish = serializers.DateField(required=False, format="%d/%m/%Y", allow_null=True)
    is_active = serializers.BooleanField(default=True, read_only=True)
    creator = ProfileRelatedField(read_only=True, required=False)
    profiles = ProfileRelatedField(queryset=Profile.objects.all(), many=True, required=False)
    prefered_idea = IdeaRelatedField(required=False, read_only=True)
    ideas = IdeaRelatedField(queryset=Idea.objects.all(), many=True, required=False)
    group_to_idea = VoteIdeaInGroupSerializer(many=True, required=False)

    class Meta:
        model = Group
        fields = ('id', 'name', 'description', 'date_creation', 'date_start', 'date_finish', 'prefered_idea', 'is_active', 'creator', 'profiles', 'ideas', 'group_to_idea')

    def create(self, validated_data):
        current_user = self.context['request'].user.id
        creator = Profile.objects.filter(user=current_user).first()
        # validated_data["profiles"] is already populated with model objects
        # maybe because i used "to_internal_value" function in ProfileRelatedField
        # profiles = [Profile.objects.filter(user=p.id).first() for p in validated_data.get("profiles")]
        profiles = validated_data.pop("profiles")
        group = Group.objects.create(**validated_data, creator=creator)
        group.profiles.set(profiles)
        return group

    def update(self, instance, validated_data):
        creator = instance.creator
        # creator must not be removed from profiles
        profiles = validated_data.pop("profiles")
        if creator not in profiles:
            profiles.append(creator)
        instance.profiles.set(profiles)
        ideas = validated_data.pop("ideas")
        instance.ideas.set(ideas)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.date_start = validated_data.get('date_start', instance.date_start)
        instance.date_finish = validated_data.get('date_finish', instance.date_finish)
        instance.save()
        return instance


class GroupCreatorSerializer(serializers.ModelSerializer):
    prefered_idea = IdeaRelatedField()

    class Meta:
        model = Group
        fields = ('prefered_idea',)


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'profile')


class CurrentUserSerializer(serializers.ModelSerializer):
    profile = CurrentUserProfileSerializer(read_only=True)

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
