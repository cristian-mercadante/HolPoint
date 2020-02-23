from django.contrib import admin
from . import models


class GroupInline(admin.StackedInline):
    model = models.Group
    extra = 0


class IdeaInline(admin.StackedInline):
    model = models.Idea
    extra = 0


class ProfileAdmin(admin.ModelAdmin):
    inlines = [GroupInline, IdeaInline]


admin.site.register(models.Profile, ProfileAdmin)
admin.site.register(models.Group)
admin.site.register(models.Idea)
admin.site.register(models.Activity)
