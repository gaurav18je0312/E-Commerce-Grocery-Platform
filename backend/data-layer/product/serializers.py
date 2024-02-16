from rest_framework import serializers
from .models import Product

class AddProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class UpdateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductByCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductBySearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductViewByAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class GetProductSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class GetProductByAdminSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'