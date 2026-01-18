from django.db import models

# Create your models here.

class CustomerModel(models.Model):
    name=models.CharField(max_length=20,blank=False)
    email=models.EmailField(unique=True)
    Phone=models.IntegerField(unique=True)
    address=models.TextField()
    created_date=models.TimeField(auto_now_add=True)