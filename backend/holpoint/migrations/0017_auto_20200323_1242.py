# Generated by Django 2.2.10 on 2020-03-23 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('holpoint', '0016_auto_20200323_1210'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='attachment',
            name='title',
        ),
        migrations.AddField(
            model_name='attachment',
            name='name',
            field=models.CharField(default='', max_length=200, verbose_name='Name'),
            preserve_default=False,
        ),
    ]
