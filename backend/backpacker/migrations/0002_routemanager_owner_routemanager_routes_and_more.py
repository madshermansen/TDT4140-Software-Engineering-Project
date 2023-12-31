# Generated by Django 4.1.6 on 2023-02-21 15:42

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backpacker', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='routemanager',
            name='owner',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='routemanager',
            name='routes',
            field=models.ManyToManyField(to='backpacker.route'),
        ),
        migrations.AlterField(
            model_name='route',
            name='dateTraveled',
            field=models.DateField(default=datetime.date(2023, 2, 21)),
        ),
    ]
