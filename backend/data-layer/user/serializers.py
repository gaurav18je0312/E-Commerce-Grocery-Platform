from rest_framework import serializers
from .models import User

class UserSignUpSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model = User
        exclude = ['is_active', 'is_admin']
        extra_kwargs={
            'password':{'write_only':True}
        }

    # Validating the password and phone number
    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('password2')
        phone_number = data.get('phone_number')

        if phone_number<999999999 or phone_number>10000000000:
            raise serializers.ValidationError("Phone number must be a 10-digit number.")

        if password!=confirm_password:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        
        return data

    def create(self, validate_data):
        return User.objects.create_user(**validate_data)
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=100)
    class Meta:
        model = User
        fields = ['email', 'password']

    def validate(self, data):
        return data
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone_number', 'address_street', 'address_city', 'address_state', 'address_pincode', 'is_admin']

class UserUpdateProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['name', 'phone_number', 'address_street', 'address_city', 'address_state', 'address_pincode']

    # Validating the phone number
    def validate(self, data):
        phone_number = data.get('phone_number')

        if phone_number<999999999 or phone_number>10000000000:
            raise serializers.ValidationError("Phone number must be a 10-digit number.")
        
        return data

class UserChangePasswordSerializer(serializers.Serializer):
    curr_password = serializers.CharField(style={'input_type':'password'},write_only=True)
    new_password = serializers.CharField(style={'input_type':'password'},write_only=True)
    confirm_new_password = serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta: 
        fields = ['curr_password','new_password', 'confirm_new_password']

    # validating the new password with confirm new password
    def validate(self, data):
        new_password = data.get('new_password')
        confirm_new_password = data.get('confirm_new_password')

        if new_password!=confirm_new_password:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        
        return data

class UserForgetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=100)
    class Meta:
        fields = ['email']
