# Generated by Django 2.2.10 on 2020-02-29 11:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('holpoint', '0002_group_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='group',
            name='users',
        ),
        migrations.AddField(
            model_name='group',
            name='profiles',
            field=models.ManyToManyField(related_name='holiday_groups', to='holpoint.Profile'),
        ),
        migrations.AlterField(
            model_name='activity',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_activities', to='holpoint.Profile'),
        ),
        migrations.AlterField(
            model_name='activity',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='liked_activities', to='holpoint.Profile'),
        ),
        migrations.AlterField(
            model_name='group',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_groups', to='holpoint.Profile'),
        ),
        migrations.AlterField(
            model_name='idea',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_ideas', to='holpoint.Profile'),
        ),
        migrations.AlterField(
            model_name='idea',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='liked_ideas', to='holpoint.Profile'),
        ),
    ]
