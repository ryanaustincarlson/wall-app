from django.conf.urls import url
from django.contrib.auth import views as auth_views

from login import views as login_views

app_name = 'login'
urlpatterns = [
    url(r'^logout/$', login_views.logout_page, name='logout'),
    url(r'^login/$', auth_views.login, name='login'),  # If user is not login it will redirect to login page
    url(r'^whoami/$', login_views.whoami, name='whoami'),
    url(r'^register/$', login_views.register, name='register'),
    url(r'^register/success/$', login_views.register_success, name='register_success'),
]
