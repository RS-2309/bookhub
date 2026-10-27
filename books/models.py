from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=200, unique=True)
    author = models.CharField(max_length=100)
    description = models.TextField()