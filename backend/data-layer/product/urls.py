from django.urls import path
from .views import *

urlpatterns = [
    path('addProduct/', AddProductAPI.as_view(), name='addProduct'),
    path('updateProduct/<id>', UpdateProductAPI.as_view(), name='updateProduct'),
    path('getProducts/page=<page>', ProductViewAPI.as_view(), name='getProducts'),
    path('category=<category>/brand=<brand>/price/min=<mn>/max=<mx>/sort=<sort>/page=<page>', ProductByCategoryAPI.as_view(), name='byCategory'),
    path('search/<search>/page=<page>', ProductBySearchAPI.as_view(), name='bySearch'),
    path('getProductsBydmin/', ProductViewByAdminAPI.as_view(), name='getProductsByAdmin'),
    path('getProduct/<id>/', GetProductAPI.as_view(), name='getProduct'),
    path('getProductByAdmin/<id>/', GetProductByAdminAPI.as_view(), name='getProductByAdmin'),
    path('deleteProduct/<id>', DeleteProductAPI.as_view(), name="deleteProduct"),
]
