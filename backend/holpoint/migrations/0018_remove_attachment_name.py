# Generated by Django 2.2.10 on 2020-03-23 11:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('holpoint', '0017_auto_20200323_1242'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='attachment',
            name='name',
        ),
    ]
