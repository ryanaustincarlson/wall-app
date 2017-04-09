from django.conf.urls import url, include
from posts import views
from rest_framework.routers import DefaultRouter

from rest_framework.schemas import get_schema_view

schema_view = get_schema_view(title='Posts API')

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'users', views.UserViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url('^schema/$', schema_view),
    url(r'^auth/', include('rest_framework.urls')),
    url(r'^whoami/', views.get_current_user, name='whoami'),
    url(r'^', include(router.urls)),
]
