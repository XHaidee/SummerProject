
from rest_framework import serializers
from api.models import Category, Customer, Products, User,Order,Items
 
class UserRegistrationSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model=User
        fields=['email','name','password','password2','tc']
        extra_kwargs={
            'password':{'write_only':True}
        }
    def validate(self,attrs):
        password = attrs.get('password')
        password2=attrs.get('password2')
        if password!=password2:
            raise serializers.ValidationError("passwrod and confirm passwrod doesn't match")
        return attrs
    def create(self,validate_data):
        return User.objects.create_user(**validate_data)  

class UserLoginSerializer(serializers.ModelSerializer):
    email =serializers.EmailField(max_length=255)
    class Meta:
        model=User
        fields=['email','password','is_admin']
    
    def validate(self,attrs):
        is_admin= attrs.get('is_admin')
        if is_admin:
            raise serializers.ValidationError("this is admin and admin shoudnot login this way asshole")
        return attrs

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','email','name']

# class UserChangerPasswrodSerializer(serializers.Serializer):
#     password=serializers.CharField(max_length=255, style={'input_type':'password'},write_only=True)
#     passwrod2=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
#     class Meta:
#         fields=['password','password2']
#     def validate(self,attrs):
#         password=attrs.get('password')
#         password2=attrs.get('password2')
#         if password !=password2:
#             raise serializers.ValidationError("passwrod and config passwrod not match")
#         user.sert_password(password)
#         user.save()
#         return super().validate(attrs)



#CUSTOMER SIRIALIZERS
class CustomerSerializers(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields=['name','phone','address']

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class ProductsSerializers(serializers.ModelSerializer):
    class Meta:
        model=Products
        fields='__all__'


# Serializer for Order
class OrderSerializers(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields='__all__'

# Serializer for Items
class ItemSerializers(serializers.ModelSerializer):
    class Meta:
        model=Items
        fields='__all__'
