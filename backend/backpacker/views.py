from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .serializers import * 
from rest_framework import viewsets      
from .models import *  
from rest_framework.decorators import action  
from rest_framework.response import Response            


class RouteView(viewsets.ModelViewSet):  
    serializer_class = RouteSerializer   
    queryset = Route.objects.all()

class ReviewView(viewsets.ModelViewSet):       
    serializer_class = ReviewSerializer          
    queryset = Review.objects.all()

class UserLikeView(viewsets.ModelViewSet):
    serializer_class = UserLikeSerializer
    queryset = UserLike.objects.all()

class RouteManagerView(viewsets.ModelViewSet):       
    serializer_class = RouteManagerSerializer          
    queryset = RouteManager.objects.all()

class UserView(viewsets.ModelViewSet):       
    serializer_class = UserSerializer          
    queryset = User.objects.all()
    

# -- Testing for unique user_id backend endpoints --
def userLikes(request, user_id): 
    queryset = RouteManager.objects.all()
    test_list = [route_manager.__dict__ for route_manager in queryset]
    serializer = RouteSerializer(data=test_list, many=True)
    if serializer.is_valid():
        return HttpResponse(json.dumps(serializer.data), status=200)
    return HttpResponse(serializer.errors, status=400)
        

def userCreated(request, user_id):
    created_routes = RouteManager.objects.get(owner=user_id).get_created_routes()
    return HttpResponse(created_routes)
