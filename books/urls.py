from django.urls import path
from . import views

app_name = "books"

urlpatterns = [
    path('search', views.search, name="search"),
    path('addbook', views.addBook, name='add_book'),
    path('displaybook', views.displayBook, name='display_book'),
]