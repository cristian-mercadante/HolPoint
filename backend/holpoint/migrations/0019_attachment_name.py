# Generated by Django 2.2.10 on 2020-03-23 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('holpoint', '0018_remove_attachment_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='attachment',
            name='name',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
    ]
