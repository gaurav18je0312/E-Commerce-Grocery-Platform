from django.urls import path
from .views import *

urlpatterns = [
    path('orderHistory/', OrderHistoryAPI.as_view(), name='orderHistory'),
    path('productByOrder/<id>', ProductByOrderAPI.as_view(), name='productByOrder'),
    path('createOrder/', CreateOrderAPI.as_view(), name='createOrder'),
]
