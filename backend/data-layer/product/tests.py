from rest_framework.test import APITestCase, APIClient
from user.models import User
from .models import Product
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

#Generate JWT Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class PublicProductTest(APITestCase):
    def setUp(self):
        self.product = Product.objects.create(product_details="testProduct", product_description="test_description", product_price=20, product_category="testcategory", product_brand="testbrand", product_quantity=10, product_imageurl="testurl")

    def test_GetProductsAPI(self):
        response = self.client.get(reverse('getProducts', kwargs={
            'page':1
        }))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["total_pages"], 1)

    def test_GetProductsByCategoryAPI(self):
        url = reverse('byCategory', kwargs={
            'category': 'testcategory',
            'brand': 'testbrand',
            'mn': 0,
            'mx': 0,
            'sort': 0,
            'page': 1
        })
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["total_pages"], 1)

    def test_GetProductsBySearchAPI(self):
        url = reverse('bySearch', kwargs={
            'search':'testProduct',
            'page':1
        })
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["total_pages"], 1)

    def test_GetProductAPI(self):
        url = reverse("getProduct", kwargs={
            'id':self.product.id
        })
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

class AdminProductTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(name="testData", email="test@gmail.com", password="test", phone_number=1234567890, address_street="teststreet", address_city="testcity", address_state="teststate", address_pincode=123456)
        self.product = Product.objects.create(product_details="testProduct", product_description="test_description", product_price=20, product_category="testcategory", product_brand="testbrand", product_quantity=10, product_imageurl="testurl")
        self.token = get_tokens_for_user(self.user)
        self.headers = {
            "Content-Type":"application/json",
            "Authorization": "Bearer " + self.token["access"]
        }

    def test_AddProductAPI(self):
        data = {
            'product_details':"testProduct2",
            'product_description':"test_description2", 
            'product_price':20, 
            'product_category':"testcategory2", 
            'product_brand':"testbrand2", 
            'product_quantity':10, 
            'product_imageurl':"testurl2"
        }
        url = reverse("addProduct")
        response = self.client.post(url,data, format='json',headers=self.headers)
        
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["Result"], "Product added successfully.")

    def test_DeleteProductAPI(self):
        url = reverse("deleteProduct", kwargs={
            'id':self.product.id
        })
        response = self.client.delete(url, headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["Result"], "Success")