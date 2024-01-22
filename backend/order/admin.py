from django.contrib import admin
from .models import Order, OrderProducts

class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'ordered_at',
        'amount',
        'payment_mode',
        'delivered_name',
        'delivered_phone_number',
        'delivered_address',
        'deliver_at',
        'delivery_status',
        'total_items'
    )

class OrderProductsAdmin(admin.ModelAdmin):
    list_display = (
        'ordered',
        'product_quantity',
        'ordered_imageurl',
        'ordered_brand',
        'ordered_details',
        'ordered_price'
    )

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderProducts, OrderProductsAdmin)
