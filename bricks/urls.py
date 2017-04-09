from django.conf.urls import url

from bricks import views

app_name = 'bricks'
urlpatterns = [
    url(r'^$', views.index, name='index'),
]
