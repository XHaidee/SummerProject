
from django.contrib import admin
from api.models import Customer, User,Products,Category,Order,Items
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.

class UserModelAdmin(BaseUserAdmin):
    # The forms to add and change user instances
  
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id','email', 'name', 'tc','is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name','tc',)}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name','tc', 'password2', 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


# Now register the new UserAdmin...
admin.site.register(User, UserModelAdmin)
# ... and, since we're not using Django's built-in permissions,

@admin.register(Customer)
class CustomerModelAdmin(admin.ModelAdmin):
    list_display=['id','user','name','phone','address']


#PRODUCT REGISTRATION
@admin.register(Products)
class CustomerModelAdmin(admin.ModelAdmin):
       list_display=['product_name','category','price','quantity','desc','image']

#PRODUCT CATEGORY
@admin.register(Category)
class CustomerModelAdmin(admin.ModelAdmin):
       list_display=['id','category_name']

#ORDER CATEGORY
@admin.register(Order)
class CustomerModelAdmin(admin.ModelAdmin):
       list_display=['id','customer','quantity','ordered_date','status']

@admin.register(Items)
class CustomerModelAdmin(admin.ModelAdmin):
       list_display=['id','order']
