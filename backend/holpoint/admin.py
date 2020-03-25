from django.contrib import admin
from . import models
from django.contrib.auth.models import User


class GroupInline(admin.StackedInline):
    model = models.Group
    extra = 0


class IdeaInline(admin.StackedInline):
    model = models.Idea
    extra = 0


class ProfileAdmin(admin.ModelAdmin):
    inlines = [GroupInline, IdeaInline]


class VoteIdeaInGroupInline(admin.StackedInline):
    model = models.VoteIdeaInGroup
    extra = 0


class GroupAdmin(admin.ModelAdmin):
    inlines = [VoteIdeaInGroupInline, ]


admin.site.register(models.Profile, ProfileAdmin)
admin.site.register(models.Group, GroupAdmin)
admin.site.register(models.Idea)
admin.site.register(models.Activity)
admin.site.register(models.IdeaComment)
admin.site.register(models.VoteIdeaInGroup)
admin.site.register(models.FriendRequest)
admin.site.register(models.ActivityComment)
admin.site.register(models.Attachment)

# Django admin appearence
admin.site.site_header = 'HolPoint'
admin.site.site_title = 'HolPoint'
admin.site.index_title = "HolPoint"
