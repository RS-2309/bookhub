from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to="profile_picture/", blank=True, null=True)
    display_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(blank=True, null=True)