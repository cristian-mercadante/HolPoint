from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    # constraints
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField("self")

    def __str__(self):
        return "{}".format(self.user.username)

# We hook these two methods to the User model, in order to avoid additional queries
# See https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html#onetoone
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Group(models.Model):
    # constraints
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="group_creator")
    admins = models.ManyToManyField(Profile, related_name="group_admins")
    profiles = models.ManyToManyField(Profile, related_name="group_profiles")

    # attributes
    name = models.CharField(max_length=200)
    date_creation = models.DateField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "{}".format(self.name)


class Idea(models.Model):
    # constraints
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="idea_creator")
    groups = models.ManyToManyField(Group, related_name="idea_groups", blank=True)
    likes = models.ManyToManyField(Profile, related_name="idea_likes", blank=True)

    # attributes
    title = models.CharField(max_length=200)
    date_creation = models.DateField(auto_now=True)
    date_start = models.DateField(auto_now=True)
    date_finish = models.DateField(auto_now=True)

    def duration(self):
        if self.date_start and self.date_finish:
            return self.date_finish - self.date_start
        else:
            return None


class Activity(models.Model):
    # constraints
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="activity_creator", null=True)
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name="activity_idea")
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="activity_group")
    likes = models.ManyToManyField(Profile, related_name="activity_likes", blank=True)

    # attributes
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=2000)
    datetime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}".format(self.title)
