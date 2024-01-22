from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ['id', 'name', 'email', 'phone_number', 'address_street', 'address_city', 'address_state', 'address_pincode', 'is_admin']
    list_filter = ["is_admin"]
    fieldsets = [
        ("User Credentials", {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ['name', 'phone_number', 'address_street', 'address_city', 'address_state', 'address_pincode']}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ['name', 'email', 'phone_number', 'address_street', 'address_city', 'address_state', 'address_pincode', 'password1', 'password2'],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["id", "email"]
    filter_horizontal = []

# Register the User Model
admin.site.register(User, UserAdmin)
