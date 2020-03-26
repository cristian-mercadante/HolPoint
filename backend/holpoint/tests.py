import json
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from holpoint import models
from rest_framework.test import APITestCase


class ProfileCreationOnUserCreationTest(TestCase):
    def test_profile_creation(self):
        user = User.objects.create(username="temp", password="ciao", email="tmp@tmp.tmp")
        profile = models.Profile.objects.get(user=user)
        self.assertEqual(profile.id, user.id)


class RetrieveActivityIdAsStringInAPI(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username="username")
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()
        self.group = models.Group.objects.create(name="group", description="description", creator=self.user.profile)
        self.group.profiles.set([self.user.profile, ])
        self.group.save()
        self.activity = models.Activity.objects.create(title="test", creator=self.user.profile, group=self.group)

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token {}".format(self.token))

    def test_list_with_ids_as_strings(self):
        url = '/api/group_activity/{}/0'.format(self.group.id)
        response = self.client.get(url, format='json')
        self.assertEqual(response.json()[0]['id'], str(self.activity.id))
