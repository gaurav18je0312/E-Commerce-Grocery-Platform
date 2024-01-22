from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'product_details',
        'product_description',
        'product_price',
        'product_category',
        'product_brand',
        'product_quantity',
    )

admin.site.register(Product, ProductAdmin)
