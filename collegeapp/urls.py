from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken import views as drf_views
from collegeapp.rest_api import*
from rest_framework_jwt.views import obtain_jwt_token
from collegeapp.views import current_user, UserList

urlpatterns = [
    url(r'^auth$', drf_views.obtain_auth_token, name='auth'),
    path('token-auth/', obtain_jwt_token),
    path('post/',POST_GP.as_view(),name='postpost'),
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]