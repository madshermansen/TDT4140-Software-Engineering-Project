# Generated by Django 4.1.6 on 2023-03-14 20:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        (
            "backpacker",
            "0008_alter_routemanager_id_alter_routemanager_likedroutes_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="review",
            name="route",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="backpacker.route",
            ),
        ),
        migrations.CreateModel(
            name="UserLike",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "likedRoute",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="backpacker.route",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
