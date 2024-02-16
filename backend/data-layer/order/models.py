from django.db import models

class OrderProducts(models.Model):
    ordered = models.ForeignKey("Order", on_delete=models.CASCADE)
    ordered_imageurl = models.CharField(max_length=1000)
    ordered_brand = models.CharField(max_length=100)
    ordered_details = models.CharField(max_length=200)
    ordered_price = models.PositiveIntegerField()
    product_quantity = models.PositiveIntegerField()

class Order(models.Model):
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
    ordered_at = models.DateTimeField(auto_now_add=True)
    amount = models.BigIntegerField()
    payment_mode = models.CharField(max_length=50)
    deliver_at = models.DateField()
    delivery_status = models.CharField(max_length=50)
    total_items = models.IntegerField(default=0)
    delivered_name = models.CharField(max_length=100)
    delivered_phone_number = models.BigIntegerField()
    delivered_address = models.CharField(max_length=200)  

