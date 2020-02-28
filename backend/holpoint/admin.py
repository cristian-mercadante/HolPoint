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


admin.site.unregister(User)
admin.site.register(User, ProfileAdmin)
admin.site.register(models.Profile)
admin.site.register(models.Group)
admin.site.register(models.Idea)
admin.site.register(models.Activity)
