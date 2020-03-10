# Generated by Django 2.2.10 on 2020-03-10 18:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('holpoint', '0002_auto_20200310_1731'),
    ]

    operations = [
        migrations.AlterField(
            model_name='voteideaingroup',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_to_idea', to='holpoint.Group'),
        ),
        migrations.AlterField(
            model_name='voteideaingroup',
            name='idea',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='idea_to_group', to='holpoint.Idea'),
        ),
        migrations.AlterField(
            model_name='voteideaingroup',
            name='votes',
            field=models.ManyToManyField(null=True, related_name='voted_ideas', to='holpoint.Profile'),
        ),
    ]
