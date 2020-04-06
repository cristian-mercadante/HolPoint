import json
from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework import status
from holpoint import models
from rest_framework.test import APITestCase


class UserProfileModelTest(TestCase):
    def test_profile_creation(self):
        user = User.objects.create(username="temp", password="ciao", email="tmp@tmp.tmp")
        profile = models.Profile.objects.get(user=user)
        self.assertEqual(profile.id, user.id)


class UserProfileAPITest(APITestCase):
    # PROFILE API:
    # - get user/profile
    # - edit field user/profile
    def setUp(self):
        self.user = User.objects.create(username="username")
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token {}".format(self.token))

    def test_get_user_profile(self):
        url = reverse("profile", kwargs={"username": self.user.username})
        response = self.client.get(url, format="json")
        self.assertTrue(status.is_success(response.status_code))

    def test_put_current_user(self):
        url = reverse("current_user")
        data = {"username": "new_username_00", "email": "email00@email.it"}
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        self.assertEqual(json.loads(response.content)["email"], data["email"])


class IdeaAPITest(APITestCase):
    # IDEA API:
    # - create idea
    # - remove idea (by creator)
    # - NOT remove idea (by else)
    # - update idea (by creator)
    # - NOT update idea(by else)
    def setUp(self):
        self.user = User.objects.create(username="username_idea")
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token {}".format(self.token))

    def test_post_idea(self):
        url = reverse("idea-list")
        data = {"title": "idea_post", "description": "aaaaaaaaaaa"}
        response = self.client.post(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))

    def test_delete_idea_by_creator(self):
        idea = models.Idea.objects.create(creator=self.user.profile, title="idea_create_by_self.user", description="aaa")
        url = reverse("idea-detail", kwargs={"pk": idea.id})
        response = self.client.delete(url, format="json")
        self.assertTrue(status.is_success(response.status_code))

    def test_NOT_delete_idea_not_created_by_current_user(self):
        random_user = User.objects.create(username="random_user_idea_delete")
        idea = models.Idea.objects.create(creator=random_user.profile, title="idea_create_by_random_user", description="aaa")
        url = reverse("idea-detail", kwargs={"pk": idea.id})
        response = self.client.delete(url, format="json")
        self.assertFalse(status.is_success(response.status_code))

    def test_put_idea_by_creator(self):
        idea = models.Idea.objects.create(creator=self.user.profile, title="idea_create_by_self.user", description="aaa")
        url = reverse("idea-detail", kwargs={"pk": idea.id})
        data = {"title": "idea_updated_by_current_user", "description": "aa"}
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))

    def test_NOT_put_idea_not_created_by_current_user(self):
        random_user = User.objects.create(username="random_user_idea_delete")
        idea = models.Idea.objects.create(creator=random_user.profile, title="idea_create_by_random_user", description="aaa")
        url = reverse("idea-detail", kwargs={"pk": idea.id})
        data = {"title": "this idea should not be deleted now", "description": "aa"}
        response = self.client.delete(url, data, format="json")
        self.assertFalse(status.is_success(response.status_code))


class GroupAPITest(APITestCase):
    # GROUP API
    # - create group
    # - edit group (by creator)
    # - edit group (by partecipant)
    # - NOT edit group (by anyone else)
    # - delete group (by creator)
    # - NOT delete group (by anyone else)
    # - creator cannot be deleted/exit from group
    # - add idea to group
    # - remove idea from group
    def setUp(self):
        self.user = User.objects.create(username="username_group")
        self.random_user = User.objects.create(username="group_random_user")
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token {}".format(self.token))

    def test_post_group(self):
        url = reverse("group-list")
        data = {"name": "group_post", "description": "aaaaaaaaaaa", "profiles": []}
        response = self.client.post(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        profile_ids = json.loads(response.content)['profiles']
        profile_ids = [p['id'] for p in profile_ids]
        self.assertIn(self.user.profile.id, profile_ids)

    def test_put_group_by_creator(self):
        group = models.Group.objects.create(creator=self.user.profile, name="group_created_by_self.user", description="aaa")
        group.profiles.set([self.user.profile])
        url = reverse("group-detail", kwargs={"pk": group.id})
        data = {
            "name": "EDITED GROUP",
            "description": "asdasd",
            "profiles": [self.user.id, self.random_user.id],
            "ideas": [],
            "date_start": None,
            "date_finish": None
        }
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))

    def test_put_group_by_partecipant(self):
        group = models.Group.objects.create(creator=self.random_user.profile, name="group_created_by_random_user", description="aaa")
        group.profiles.set([self.random_user.profile, self.user.profile])
        url = reverse("group-detail", kwargs={"pk": group.id})
        data = {
            "name": "EDITED GROUP",
            "description": "asdasd",
            "profiles": [self.user.id, self.random_user.id],
            "ideas": [],
            "date_start": None,
            "date_finish": None
        }
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))

    def test_NOT_put_group_by_non_partecipant(self):
        group = models.Group.objects.create(creator=self.random_user.profile, name="group_created_by_random_user", description="aaa")
        group.profiles.set([self.random_user.profile])
        url = reverse("group-detail", kwargs={"pk": group.id})
        data = {
            "name": "EDITED GROUP",
            "description": "asdasd",
            "profiles": [self.user.id, self.random_user.id],
            "ideas": [],
            "date_start": None,
            "date_finish": None
        }
        response = self.client.put(url, data, format="json")
        self.assertFalse(status.is_success(response.status_code))

    def test_delete_group_by_creator(self):
        group = models.Group.objects.create(creator=self.user.profile, name="group_created_by_self.user", description="aaa")
        group.profiles.set([self.user.profile])
        url = reverse("group_creator-detail", kwargs={"pk": group.id})
        response = self.client.delete(url, format="json")
        self.assertTrue(status.is_success(response.status_code))

    def test_NOT_delete_group_by_non_creator(self):
        group = models.Group.objects.create(creator=self.random_user.profile, name="group_created_by_random_user", description="aaa")
        group.profiles.set([self.random_user.profile])
        url = reverse("group_creator-detail", kwargs={"pk": group.id})
        response = self.client.delete(url, format="json")
        self.assertFalse(status.is_success(response.status_code))

    def test_put_creator_out_of_group_MUST_FAIL(self):
        group = models.Group.objects.create(creator=self.random_user.profile, name="group_created_by_random_user", description="aaa")
        group.profiles.set([self.random_user.profile, self.user.profile])
        url = reverse("group-detail", kwargs={"pk": group.id})
        data = {
            "name": "EDITED GROUP",
            "description": "asdasd",
            "profiles": [self.user.id],
            "ideas": [],
            "date_start": None,
            "date_finish": None
        }
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        profile_ids = json.loads(response.content)['profiles']
        profile_ids = [p['id'] for p in profile_ids]
        self.assertIn(self.random_user.id, profile_ids)

    def test_put_add_idea_into_group(self):
        group = models.Group.objects.create(creator=self.user.profile, name="group_created_by_self.user", description="aaa")
        group.profiles.set([self.user.profile])
        url = reverse("group-detail", kwargs={"pk": group.id})
        idea = models.Idea.objects.create(creator=self.user.profile, title="add to group", description="asdasd")
        data = {
            "name": "EDITED GROUP",
            "description": "asdasd",
            "profiles": [self.user.id, self.random_user.id],
            "ideas": [idea.id],
            "date_start": None,
            "date_finish": None
        }
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        idea_ids = json.loads(response.content)['ideas']
        idea_ids = [i['id'] for i in idea_ids]
        self.assertIn(idea.id, idea_ids)

    def test_put_remove_idea_from_group(self):
        group = models.Group.objects.create(creator=self.user.profile, name="group_created_by_self.user", description="aaa")
        group.profiles.set([self.user.profile])
        idea = models.Idea.objects.create(creator=self.user.profile, title="add to group", description="asdasd")
        group.ideas.set([idea])
        url = reverse("group-detail", kwargs={"pk": group.id})
        data = {
            "name": "EDITED GROUP",
            "description": "asdasd",
            "profiles": [self.user.id, self.random_user.id],
            "ideas": [],
            "date_start": None,
            "date_finish": None
        }
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        idea_ids = json.loads(response.content)['ideas']
        idea_ids = [i['id'] for i in idea_ids]
        self.assertNotIn(idea.id, idea_ids)


class VoteIdeaAPITest(APITestCase):
    # VOTE API:
    # - vote idea
    # - remove vote idea
    def setUp(self):
        self.user = User.objects.create(username="username_idea")
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()
        self.group = models.Group.objects.create(creator=self.user.profile, name="dsad", description="sdfsd")
        self.group.profiles.set([self.user.profile])
        self.idea = models.Idea.objects.create(creator=self.user.profile, title="sad", description="dsfdsfre")
        self.group.ideas.set([self.idea])

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token {}".format(self.token))

    def test_post_add_vote_THEN_remove(self):
        url = reverse('vote_idea', kwargs={'group_id': self.group.id, 'idea_id': self.idea.id})
        data = {}
        # add
        response = self.client.post(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        self.assertEqual(json.loads(response.content)['group'], self.group.id)
        self.assertEqual(json.loads(response.content)['idea'], self.idea.id)
        vote_ids = json.loads(response.content)['votes']
        vote_ids = [v['id'] for v in vote_ids]
        self.assertIn(self.user.id, vote_ids)
        # remove
        response = self.client.post(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        self.assertEqual(json.loads(response.content)['group'], self.group.id)
        self.assertEqual(json.loads(response.content)['idea'], self.idea.id)
        vote_ids = json.loads(response.content)['votes']
        vote_ids = [v['id'] for v in vote_ids]
        self.assertNotIn(self.user.id, vote_ids)


class ActivityAPITest(APITestCase):
    # ACTIVITY API:
    # - id as string
    # - create activity (by partecipant)
    # - NOT create activity (by else)
    # - edit activity (by creator)
    # - edit activity (by partecipant)
    # - delete activity (by creator)
    # - NOT delete activity (by else)
    def setUp(self):
        self.user = User.objects.create(username="username")
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()
        self.group = models.Group.objects.create(name="group", description="description", creator=self.user.profile)
        self.group.profiles.set([self.user.profile, ])
        self.activity = models.Activity.objects.create(title="test", creator=self.user.profile, group=self.group)
        self.random_user = User.objects.create(username="random")

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token {}".format(self.token))

    def test_get_list_with_ids_as_strings(self):
        url = reverse("activity", kwargs={"group_id": self.group.id, "activity_id": 0})
        response = self.client.get(url, format="json")
        self.assertEqual(response.json()[0]["id"], str(self.activity.id))

    def test_post_activity_in_group_where_partecipant(self):
        url = reverse("activity_creator-list")
        data = {"title": "sdfdsfsdf", "group": self.group.id}
        response = self.client.post(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))

    def test_post_activity_in_group_where_not_partecipant(self):
        group = models.Group.objects.create(creator=self.random_user.profile, name="sdfdsf", description="sdfsdf")
        url = reverse("activity_creator-list")
        data = {"title": "sdfdsfsdf", "group": group.id}
        response = self.client.post(url, data, format="json")
        self.assertFalse(status.is_success(response.status_code))

    def test_put_activity_in_group_by_creator(self):
        url = reverse("activity", kwargs={"group_id": self.group.id, "activity_id": self.activity.id})
        data = {"title": "sdfdsfsdf"}
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))

    def test_put_activity_not_change_group(self):
        new_group = models.Group.objects.create(creator=self.random_user.profile, name="sdfds", description="dsfds")
        url = reverse("activity", kwargs={"group_id": self.group.id, "activity_id": self.activity.id})
        data = {"title": "sdfdsfsdf", "group": new_group.id}  # trying to steal activity
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        activity_group_id = json.loads(response.content)['group']
        self.assertEqual(activity_group_id, self.group.id)

    def test_put_activity_in_group_by_partecipant(self):
        group = models.Group.objects.create(creator=self.random_user.profile, name="sdfds", description="dsfds")
        activity = models.Activity.objects.create(title="test", creator=self.random_user.profile, group=group)
        group.profiles.set([self.user.profile, self.random_user.profile])
        group.activities.set([activity])
        url = reverse("activity", kwargs={"group_id": group.id, "activity_id": activity.id})
        data = {"title": "sdfdsfsdf"}
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))

    def test_delete_activity_by_creator(self):
        url = reverse("activity_creator-detail", kwargs={"pk": self.activity.id})
        response = self.client.delete(url, {"group": self.group.id}, format="json")
        self.assertTrue(status.is_success(response.status_code))

    def test_NOT_delete_activity_by_not_creator(self):
        group = models.Group.objects.create(creator=self.random_user.profile, name="sdfds", description="dsfds")
        activity = models.Activity.objects.create(title="test", creator=self.random_user.profile, group=group)
        group.profiles.set([self.user.profile, self.random_user.profile])
        group.activities.set([activity])
        url = reverse("activity_creator-detail", kwargs={"pk": activity.id})
        response = self.client.delete(url, {"group": group.id}, format="json")
        self.assertFalse(status.is_success(response.status_code))


class FriendRequestAPITest(APITestCase):
    #   FRIEND REQUEST:
    # - send friend request
    # - accept friend request
    # - refuse friend request
    # - assure deletion of request after accept/refuse
    # - NOT send friend request to yourself
    def setUp(self):
        self.user_1 = User.objects.create(username="username_1")
        self.user_2 = User.objects.create(username="username_2")
        self.token_1 = Token.objects.create(user=self.user_1)
        self.token_2 = Token.objects.create(user=self.user_2)

    def api_authentication(self, token):
        self.client.credentials(HTTP_AUTHORIZATION="Token {}".format(token))

    def test_send_and_accept_friend_request(self):
        # send
        url = reverse('friendrequest-list')
        self.api_authentication(self.token_1)
        data = {"receiver": self.user_2.id, "sender": self.user_1.id}
        response = self.client.post(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        # collecting data for net operation
        content = json.loads(response.content)
        req_id = content['id']
        sender_id = self.user_1.id
        receiver_id = self.user_2.id
        # accept
        url = reverse('friendrequest-detail', kwargs={"pk": req_id})
        self.api_authentication(self.token_2)
        data = {"status": "Acc", "sender": sender_id, "receiver": receiver_id}
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        self.assertTrue(self.user_1.profile.sent_requests, [])

    def test_send_and_refuse_friend_request(self):
        # send
        url = reverse('friendrequest-list')
        self.api_authentication(self.token_1)
        data = {"receiver": self.user_2.id, "sender": self.user_1.id}
        response = self.client.post(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        # collecting data for net operation
        content = json.loads(response.content)
        req_id = content['id']
        sender_id = self.user_1.id
        receiver_id = self.user_2.id
        # accept
        url = reverse('friendrequest-detail', kwargs={"pk": req_id})
        self.api_authentication(self.token_2)
        data = {"status": "Ref", "sender": sender_id, "receiver": receiver_id}
        response = self.client.put(url, data, format="json")
        self.assertTrue(status.is_success(response.status_code))
        self.assertTrue(self.user_1.profile.sent_requests, [])

    def test_not_send_friend_request_to_yourself(self):
        # send
        url = reverse('friendrequest-list')
        self.api_authentication(self.token_1)
        data = {"receiver": self.user_1.id, "sender": self.user_1.id}
        response = self.client.post(url, data, format="json")
        self.assertFalse(status.is_success(response.status_code))
