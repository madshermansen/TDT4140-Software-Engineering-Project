import json
from django.db import models
from django.contrib.auth.models import User
from datetime import date


class Route(models.Model):
  
  id = models.AutoField(primary_key=True)
  author = models.ForeignKey(User, blank = True, null = True, default=None, on_delete=models.SET_NULL)
  title = models.CharField(max_length=100)
  description = models.TextField(default=None, null=True)
  dateCreated = models.TextField(default=None, null=True)
  duration = models.FloatField(default=None, null=True)
  authorRating = models.FloatField(default=None, null=True)
  priceEstimate = models.FloatField(default=None, null=True)
  tags = models.TextField(null=True)

  # def __str__(self):
  #   return self.title

class UserLike(models.Model):

  user = models.ForeignKey(User, on_delete=models.CASCADE)
  likedRoute = models.ForeignKey(Route, on_delete=models.CASCADE)
  class Meta:
    unique_together = ('user', 'likedRoute')

class RouteManager(models.Model):

  id = models.AutoField(primary_key=True)
  owner = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
  createdRoutes = models.ManyToManyField(Route, related_name='createdRoutes')
  likedRoutes = models.ManyToManyField(Route, related_name='likedRoutes', default=None)


class Review(models.Model):
  id = models.AutoField(primary_key=True)
  route = models.ForeignKey(Route, blank = True, null = True, default=None, on_delete=models.CASCADE)
  author = models.ForeignKey(User, blank = True, null = True, default=None, on_delete=models.SET_NULL)
  rating = models.IntegerField()
  comment = models.TextField()
  class Meta:
    unique_together = ('route', 'author')