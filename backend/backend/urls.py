"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from backpacker import views

router = routers.DefaultRouter()
router.register(r'routes', views.RouteView, 'routes')
router.register(r'reviews', views.ReviewView, 'reviews')
router.register(r'routeManagers', views.RouteManagerView, 'routemanager')
router.register(r'users', views.UserView, 'users')
router.register(r'userLikes', views.UserLikeView, 'userLikes')


urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/user=<int:user_id>/likes/', views.userLikes, name='likes'), # If we want to call unique endpoint for each user_id
    path('api/user=<int:user_id>/created/', views.userCreated, name='created'), # If we want to call unique endpoint for each user_id
    path("api/", include(router.urls))
]