from django.urls import path 
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', UserSignUpAPI.as_view(), name='signUp'),
    path('login/', UserLoginAPI.as_view(), name='login'),
    path('profile/', UserProfileAPI.as_view(), name='getProfile'),
    path('profile/update/', UserUpdateProfileAPI.as_view(), name='updateProfile'),
    path('profile/changePassword/', UserChangePasswordAPI.as_view(), name='changePassword'),
    path('profile/forgetPassword/', UserForgetPasswordAPI.as_view(), name='forgetPassword'),
    path('logout/', UserLogoutAPI.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refreshToken'),
    path('adminSignUp/', AdminSignUp.as_view(), name="adminSignUp"),
]
