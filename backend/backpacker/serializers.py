from rest_framework import serializers
from .models import *

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ("id", "author","title","description","dateCreated","duration","authorRating","priceEstimate","tags")

class RouteManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = RouteManager
        fields = ('owner', 'createdRoutes', 'likedRoutes')

class UserLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLike
        fields = ('id', 'user', 'likedRoute')
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'route', 'author', 'rating', 'comment')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", 'username', 'password', 'first_name', 'last_name')