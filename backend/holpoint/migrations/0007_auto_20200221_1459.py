# Generated by Django 2.2.10 on 2020-02-21 14:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('holpoint', '0006_auto_20200221_1452'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='activity',
            name='datetime',
        ),
        migrations.RemoveField(
            model_name='idea',
            name='date_finish',
        ),
        migrations.RemoveField(
            model_name='idea',
            name='date_start',
        ),
    ]
