from django.db import models

class Cart(models.Model):
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
    product = models.ForeignKey("product.Product", on_delete=models.CASCADE)
    cart_quantity = models.PositiveIntegerField(null=True)

    
