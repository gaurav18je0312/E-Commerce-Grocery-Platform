import string
import secrets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from .utils import Util
from .permissions import IsAdmin

#Generate the 8-character Random Password
def get_rand_password():
    characters = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(characters) for i in range(8))

    return password

# Generate JWT Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserSignUpAPI(APIView):
    def post(self, request):
        serializer = UserSignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'Result':'Account created successfully.'},status=status.HTTP_201_CREATED )
        else:
            error = serializer.errors
            print(error)
            if 'email' in error:
                responseData = {
                    'errors': error['email']
                }
            else:
                responseData = {
                    'errors': error['non_field_errors']
                }
            return Response(responseData, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPI(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate(email=email, password=password)
            if user is None: 
                return Response({'errors':'Email or Password is not valid.'}, status=status.HTTP_404_NOT_FOUND)
            else:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'Result':'Success'},status=status.HTTP_200_OK)
        else:
            error = serializer.errors
            if 'email' in error:
                responseData = {
                    'errors': error['email']
                }
            else:
                responseData = {
                    'errors': error['non_field_errors']
                }
        return Response(responseData, status=status.HTTP_400_BAD_REQUEST)

class UserProfileAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserChangePasswordAPI(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        serializer = UserChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.validated_data['curr_password']
            new_password = serializer.validated_data['new_password']
            user = request.user
            match_password = check_password(old_password, user.password)

            if (match_password):
                user.set_password(new_password)
                user.save()
                return Response({"Result":"Success"},status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"errors":"Invalid Password."},status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({'errors':serializer.errors["non_field_errors"]},status=status.HTTP_400_BAD_REQUEST)

class UserUpdateProfileAPI(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        serializer = UserUpdateProfileSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            user.name = serializer.validated_data['name']
            user.phone_number = serializer.validated_data['phone_number']
            user.address_street = serializer.validated_data['address_street']
            user.address_city = serializer.validated_data['address_city']
            user.address_state = serializer.validated_data['address_state']
            user.address_pincode = serializer.validated_data['address_pincode']
            user.save()
            return Response({'Result':'Success'}, status=status.HTTP_202_ACCEPTED)
        
        return Response({'errors':serializer.errors},status=status.HTTP_400_BAD_REQUEST)
    
class UserForgetPasswordAPI(APIView):
    def put(self, request):
        serializer = UserForgetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                rand_pass = get_rand_password()
                # Send Email
                data = {
                    'subject': 'GreenBasket - Your New Password',
                    'body': f'Hi {user.name}, \nUse the Password {rand_pass} to login. \nSee you soon, \nTeam GreenBasket',
                    'to_email': user.email
                }
                Util.send_mail(data)
                user.set_password(rand_pass)
                return Response({'Result':'New password sended to your email.'}, status=status.HTTP_201_CREATED)
            except(User.DoesNotExist):
                return Response({'errors':'Email not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'errors':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutAPI(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request):
        try:
            token = request.data.get('refresh')
            RefreshToken(token).blacklist()
            return Response({'Result':'Success'}, status=status.HTTP_200_OK)
        except TokenError:
            return Response({'Result':'Failure'}, status=status.HTTP_404_NOT_FOUND)
        
class AdminSignUp(APIView):
    permission_classes = [IsAdmin]     
    def post(self, request):
        serializer = UserSignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_admin = True
            user.save()
            return Response({'Result':'Admin added successfully.'},status=status.HTTP_201_CREATED )
        else:
            error = serializer.errors
            print(error)
            if 'email' in error:
                responseData = {
                    'errors': error['email']
                }
            else:
                responseData = {
                    'errors': error['non_field_errors']
                }
            return Response(responseData, status=status.HTTP_400_BAD_REQUEST)
