from django.urls import path
from .views import *

urlpatterns = [
    path('getCart/', GetCartAPI.as_view(), name='getCart'),
    path('addProduct/<id>/', AddProductAPI.as_view(), name='addProduct'),
    path('removeProduct/<id>/', RemoveProductAPI.as_view(), name='removeProduct'),
    path('removeCart/', RemoveCartAPI.as_view(), name='removeCart'),
]
