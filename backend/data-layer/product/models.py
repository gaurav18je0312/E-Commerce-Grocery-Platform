from django.db import models

class Product(models.Model):
    product_details = models.CharField(max_length=200)
    product_description = models.CharField(max_length=1000)
    product_price = models.PositiveIntegerField()
    product_category = models.CharField(max_length=100)
    product_brand = models.CharField(max_length=100)
    product_quantity = models.PositiveIntegerField()
    product_imageurl = models.CharField(max_length=1000)

    def __str__(self):
        return self.product_details
