from rest_framework.test import APITestCase, APIClient
from user.models import User
from .models import Cart
from product.models import Product
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

# Generate JWT Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserCartTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(name="testData", email="test@gmail.com", password="test", phone_number=1234567890, address_street="teststreet", address_city="testcity", address_state="teststate", address_pincode=123456)
        self.product = Product.objects.create(product_details="testProduct", product_description="test_description", product_price=20, product_category="testcategory", product_brand="testbrand", product_quantity=10, product_imageurl="testurl")
        self.cart = Cart.objects.create(user=self.user, product=self.product, cart_quantity=9)
        self.token = get_tokens_for_user(self.user)
        self.headers = {
            "Content-Type":"application/json",
            "Authorization": "Bearer " + self.token["access"]
        }

    def test_getCartAPI(self):
        response = self.client.get(reverse("getCart"), headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["totalPrice"], 160)

    def test_addProductAPI(self):
        url = reverse("addProduct", kwargs={
            'id':self.product.id
        })
        response = self.client.post(url, headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["Result"], "Product added.")

    def test_removeProductAPI(self):
        url = reverse("removeProduct", kwargs={
            'id':self.product.id
        })
        response = self.client.post(url, headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["Result"], "Product removed.")

