# Generated by Django 4.0.1 on 2022-05-17 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_products_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='tc',
            field=models.BooleanField(default=True),
        ),
    ]
