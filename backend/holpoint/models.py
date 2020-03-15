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


class Idea(models.Model):
    # constraints
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="ideas")

    # attributes
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    date_creation = models.DateField(auto_now=True)

    def __str__(self):
        return "{}".format(self.title)

    def duration(self):
        if self.date_start and self.date_finish:
            return self.date_finish - self.date_start
        else:
            return None


class Group(models.Model):
    # constraints
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="created_groups")
    profiles = models.ManyToManyField(Profile, related_name="groups")
    prefered_idea = models.ForeignKey(Idea, null=True, blank=True, on_delete=models.SET_NULL)
    ideas = models.ManyToManyField(Idea, blank=True, related_name="groups", through="VoteIdeaInGroup")

    # attributes
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, default="")
    date_creation = models.DateField(auto_now=True)
    date_start = models.DateField(null=True, blank=True)
    date_finish = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "{}".format(self.name)


class VoteIdeaInGroup(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name="idea_to_group")
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="group_to_idea")
    votes = models.ManyToManyField(Profile, blank=True, related_name="voted_ideas")

    class Meta:
        unique_together = (('idea', 'group'),)

    def __str__(self):
        return "G: {} - I: {}".format(self.group, self.idea)


class Activity(models.Model):
    # constraints
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="created_activities", null=True)
    group = models.ForeignKey(Group, null=True, on_delete=models.CASCADE, related_name="activities")

    # attributes
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=2000)
    datetime = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "{}".format(self.title)


class Comment(models.Model):
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="created_comments")
    text = models.TextField(null=False, blank=False)
    datetime = models.DateTimeField(auto_now=True)


class IdeaComment(Comment):
    to = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return "{}: {}".format(self.creator, self.to)


class ActivityComment(Comment):
    to = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name="comments")
