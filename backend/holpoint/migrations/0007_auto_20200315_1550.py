# Generated by Django 2.2.10 on 2020-03-15 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('holpoint', '0006_auto_20200315_1017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='date_finish',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='group',
            name='date_start',
            field=models.DateField(blank=True, null=True),
        ),
    ]