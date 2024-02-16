from rest_framework.test import APITestCase, APIClient
from .models import User
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

class SignUpTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.data = {
            'email': "test@gmail.com",
            'password':'test',
            'password2':'test',
            'name':'testData',
            'phone_number':1234567890,
            'address_street':"teststreet",
            'address_city':"testcity",
            'address_state':"teststate",
            'address_pincode':123456
        }
    
    def test_SignUp(self):
        response = self.client.post(reverse('signUp'), self.data)
        result = response.data["Result"]

        self.assertEqual(response.status_code, 201)
        self.assertEqual(result, "Account created successfully.")

class UserTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(name="testData", email="test@gmail.com", password="test", phone_number=1234567890, address_street="teststreet", address_city="testcity", address_state="teststate", address_pincode=123456)

    def test_loginAPI(self):
        response = self.client.post(reverse('login'), {'email':'test@gmail.com', 'password':'test'})
        result = response.data["Result"]

        self.assertEqual(response.status_code, 200)
        self.assertEqual(result, "Success")

    def test_forgetPassAPI(self):
        response = self.client.put(reverse('forgetPassword'), {'email':'test@gmail.com'})
        result = response.data["Result"]

        self.assertEqual(response.status_code, 201)
        self.assertEqual(result, "New password sended to your email.")

class UserTokenTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(name="testData", email="test@gmail.com", password="test", phone_number=1234567890, address_street="teststreet", address_city="testcity", address_state="teststate", address_pincode=123456)
        self.token = get_tokens_for_user(self.user)
        self.headers = {
            "Content-Type":"application/json",
            "Authorization": "Bearer " + self.token["access"]
        }

    def test_UserProfileTest(self):
        response = self.client.get(reverse('getProfile'),headers=self.headers)
        
        self.assertEqual(response.status_code, 200)



