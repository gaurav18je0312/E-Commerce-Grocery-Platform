from django.contrib import admin
from .models import Cart

class CartAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'product',
        'cart_quantity'
    )

admin.site.register(Cart, CartAdmin)
