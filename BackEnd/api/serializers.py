
from rest_framework import serializers
from api.models import Category, Customer, Products, User
 
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
        fields=['email','password']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields='__all__'

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class ProductsSerializers(serializers.ModelSerializer):
    class Meta:
        model=Products
        fields='__all__'

    