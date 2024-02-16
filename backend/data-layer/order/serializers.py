from rest_framework import serializers
from .models import Order, OrderProducts

class OrderHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        exclude = ["user"]

class ProductByOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProducts
        exclude = ["ordered"]

class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        exclude = ["user", "ordered_at", "deliver_at", "delivery_status", "total_items"]