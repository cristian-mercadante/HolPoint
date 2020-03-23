# Generated by Django 2.2.10 on 2020-03-23 11:10

from django.db import migrations, models
import private_storage.fields
import private_storage.storage.files


class Migration(migrations.Migration):

    dependencies = [
        ('holpoint', '0015_auto_20200323_0144'),
    ]

    operations = [
        migrations.AddField(
            model_name='attachment',
            name='title',
            field=models.CharField(default='', max_length=200, verbose_name='Title'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='attachment',
            name='file',
            field=private_storage.fields.PrivateFileField(storage=private_storage.storage.files.PrivateFileSystemStorage(), upload_to='', verbose_name='File'),
        ),
    ]
