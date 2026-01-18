from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import CustomerModel
from .serializers import CustomerSerializer


class CustomerViewSet(ModelViewSet):
    queryset=CustomerModel.objects.all()
    serializer_class=CustomerSerializer