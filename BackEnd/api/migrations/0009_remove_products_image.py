# Generated by Django 4.0.1 on 2022-05-21 12:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_user_tc'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='image',
        ),
    ]
