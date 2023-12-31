# Generated by Django 4.1.6 on 2023-02-21 16:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backpacker', '0002_routemanager_owner_routemanager_routes_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='routemanager',
            name='routes',
        ),
        migrations.AddField(
            model_name='routemanager',
            name='createdRoutes',
            field=models.ManyToManyField(related_name='createdRoutes', to='backpacker.route'),
        ),
        migrations.AddField(
            model_name='routemanager',
            name='likedRoutes',
            field=models.ManyToManyField(related_name='likedRoutes', to='backpacker.route'),
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('rating', models.IntegerField()),
                ('comment', models.TextField()),
                ('author', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('route', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='backpacker.route')),
            ],
        ),
    ]
