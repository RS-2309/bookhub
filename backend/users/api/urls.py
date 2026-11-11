from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_user, name="register"),
    path("me/", views.current_user, name="current_user"),
    path("login/", views.login_user, name="login"),
    path("logout/", views.logout_user, name="logout"),
    path("csrf/", views.csrf_token, name="csrf_token"),
]