# Adventure Atlas project setup

-   This file is a detailed step-by-step documentation of how this project was set up
-   This is not something you as a developer need to do, but insight into the initial steps

## BACKEND

0.  Create Project directory:
1.  `mkdir backpackerApp`
2.  `cd backpackerApp`
3.  Create virtual environment
4.  `pip install pipenv`
5.  `pipenv shell`
6.  Start backend:
7.  `django-admin startproject backend`
8.  Add "backpacker" folder into project (is this the frontend folder? No maybe not. Think this is the application folder)
9.  Add "backpacker" to INSTALLED_APPS in backend/backend/settings.py
10. Added models.py file to backend/backpacker and added the following code:

    -                   from django.db import models

                        class Route(models.Model):
                            title = models.CharField(max_length=100)
                            description = models.TextField()
                            traveled = models.BooleanField(default=False)

                            def _str_(self):
                                return self.title

11. `cd backend`
12. `python3 manage.py makemigrations`
13. `python3 manage.py migrate`
14. Made admin.py file inside backend/backpacker folder and added the following code:

    1.           from django.contrib import admin
            from .models import Route

            class BackpackerAdmin(admin.ModelAdmin):
                list = ('title', 'description', 'traveled')

            admin.site.register(Route, BackpackerAdmin)

15. `python3 manage.py createsuperuser`
    1.  username: gruppe59
    2.  email: alexmak@stud.ntnu.no
    3.  password: gruppe59PU
16. `python manage.py runserver`
17. Added `rest_framework` and `corsheaders` to INSTALLED_APPS in backend/settings.py
18. Added "corsheaders.middleware.CorsMiddleware" to MIDDLEWARE in backend/settings.py
19. Added whitelist to CORS_ORIGIN_WHITELIST in backend/settings.py:

        1.  CORS_ORIGIN_WHITELIST = ['http://localhost:3000']

20. Create serializer file which converts Django models to JSON objects:
    1.  in backend:
    2.  `touch backpacker/serializers.py`
21. Add following code to serializers.py file:

        1. from rest_framework import serializers
           from .models import Route

           class RouteSerializer(serializers.ModelSerializer):
              class Meta:
                 model = Route
                 fields = ('id' ,'title', 'description', 'traveled')`

22. Add views.py file to backpacker folder and added following code:

    1.         from django.shortcuts import render
            from .serializers import TodoSerializer
            from rest_framework import viewsets
            from .models import Todo

            class TodoView(viewsets.ModelViewSet):
                serializer_class = TodoSerializer
                queryset = Todo.objects.all()

23. Define URL routes for the API in backend/urls.py with the following code:

    1.         from django.contrib import admin
            from django.urls import path, include
            from rest_framework import routers
            from backpacker import views

            router = routers.DefaultRouter()
            router.register(r'routes', views.RouteView, "routes")

            urlpatterns = [
            path("admin/", admin.site.urls),
            path("api/", include(router.urls))
            ]

24. localhost:8000/api/ now shows the available endpoints
25. Had a bug because of a step the guide did not show
    1.  In localhost:8000/api/routes I got OperationalError: No such table found: "backpacker_route"
    2.  Had to run `python3 manage.py migrate --run-syncdb`to migrate new backpacker app, rest_framework and to create te backpacker_route table in db
    3.  Now localhost:8000/api/routes shows the route endpoint and you can test putting new routes to db from the api interface
26. Backend should now be done!

## FRONTEND

1. Create react app (this is a widely used template)
2. run `npm install -g create-react-app`
3. in project folder run `create-react-app frontend`
4. in frontend inside App.js, added some testdata and display it on page. This test data is now visible on localhost:3000
5. Added proxy to package.json:
    1. proxy: "http://localhost:8000"
    2. This is the initialization of the connection between backend and frontend
6. Added some code to App.js which fetches routes from backend and displays them
7. In frontend folder run `npm install axios`
8. And then `npm audit fix --force` to fix some high severity vulnerabilities
9. Have some problems with the package dependencies. Trying to revert the package.json file and then running `npm install`
10. Moving node_modules to trash and running `npm install` again
