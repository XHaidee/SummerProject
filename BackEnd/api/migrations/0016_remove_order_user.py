# Generated by Django 4.0.1 on 2022-07-25 20:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_items_order_delete_orders_items_order_items_products'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='user',
        ),
    ]
