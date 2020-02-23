# Generated by Django 2.2.10 on 2020-02-21 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('holpoint', '0004_auto_20200221_1447'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='activity_likes', to='holpoint.Profile'),
        ),
        migrations.AlterField(
            model_name='idea',
            name='groups',
            field=models.ManyToManyField(blank=True, related_name='idea_groups', to='holpoint.Group'),
        ),
        migrations.AlterField(
            model_name='idea',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='idea_likes', to='holpoint.Profile'),
        ),
    ]
