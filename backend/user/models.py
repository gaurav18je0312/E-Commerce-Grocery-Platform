from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, name, phone_number, address_street, address_city, address_state, address_pincode, password=None, password2=None):
        """
        Creates and saves a User with the given email, name, phone_number, address_street, 
        address_city, address_state, address_pincode and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            phone_number=phone_number,
            address_street=address_street,
            address_city=address_city,
            address_state=address_state,
            address_pincode=address_pincode,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, phone_number, address_street, address_city, address_state, address_pincode, password=None):
        """
        Creates and saves a superuser with the given email, name, phone_number, address_street, 
        address_city, address_state, address_pincode and password.
        """
        user = self.create_user(
            email,
            password=password,
            name=name,
            phone_number=phone_number,
            address_street=address_street,
            address_city=address_city,
            address_state=address_state,
            address_pincode=address_pincode,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    phone_number = models.BigIntegerField()
    address_street = models.CharField(max_length=200)
    address_city = models.CharField(max_length=50)
    address_state = models.CharField(max_length=50)
    address_pincode = models.IntegerField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone_number', 'address_street', 'address_city', 'address_state', 'address_pincode']

    def __str__(self):
        return self.name
    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin