from django.contrib import admin
from .models import *

class BackpackerAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'traveled')

admin.site.register(Route, BackpackerAdmin)
admin.site.register(Review, BackpackerAdmin)
admin.site.register(RouteManager, BackpackerAdmin)