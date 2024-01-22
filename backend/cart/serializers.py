from rest_framework import serializers
from .models import Cart

class GetCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        exclude = ['user']