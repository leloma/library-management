# Generated by Django 4.1.7 on 2023-04-07 10:41

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_book_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=api.models.imageuploadpath),
        ),
    ]
