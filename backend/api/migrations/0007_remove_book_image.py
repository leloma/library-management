# Generated by Django 4.1.7 on 2023-04-07 10:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_book_bookname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='image',
        ),
    ]
