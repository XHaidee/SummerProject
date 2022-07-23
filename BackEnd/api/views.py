from functools import partial
from pstats import Stats
from django.shortcuts import render
from .models import Products,Category,User,Customer
from api.serializers import UserLoginSerializer,ProductsSerializers, UserRegistrationSerializer,CategorySerializers,CustomerSerializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
class UserRegistrationView(APIView):
    def post(self,request,format=None):
        serializer=UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user=serializer.save()
            token=get_tokens_for_user(user)
            return Response({'token':token,'msg':'Registration Success'},status=status.HTTP_201_CREATED)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self,request,format=None):
        serializer=UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email=serializer.data.get('email')
            password=serializer.data.get('password')
            user= authenticate(email=email,password=password)
            if user is not None:
                token=get_tokens_for_user(user)
                return Response({'token':token,'msg':'Login Success'},status=status.HTTP_200_OK)
            else:
                 return Response({'errors':{'non_field_errors':['Emaol or passwrod is not valid']}},status=status.HTTP_404_NOT_FOUND)
                   


#NOW DEFINE VIEW CLASS FOR THE PRODUCT MANAGEMENT
class ProductView(APIView):
    def get(self,request,pk=None,format=None):
        id=pk
        if id is not None:
            pro=Products.objects.get(id=id)
            serializer=ProductsSerializers(pro)
            return Response(serializer.data)
        pro=Products.objects.all()
        serializer=ProductsSerializers(pro,many=True)
        return Response(serializer.data)
    

    def post(self,request,format=None):
        serializer=ProductsSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Data Created'},status=Stats.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,pk,fromat=None):
            id=pk
            pro=Products.objects.get(id=id)
            serializer=ProductsSerializers(pro,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'msg':'Complete Data Updated'})
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def patch(self,request,pk,format=None):
        id=pk
        pro=Products.objects.get(id=id)
        serializer=ProductsSerializers(pro,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Partial Data Updated'})
        return Response(serializer.errors)

    def delete(self,request,pk,format=None):
         id=pk
         pro=Products.objects.get(id=id)
         pro.delete()
         return Response({'msg':'Data Deleted'})
        



#CATEGORY VIEW 
class CategoryView(APIView):
    def get(self,request,pk=None,format=None):
        id=pk
        if id is not None:
            pro=Category.objects.get(id=id)
            serializer=CategorySerializers(pro)
            return Response(serializer.data)
        pro=Category.objects.all()
        serializer=CategorySerializers(pro,many=True)
        return Response(serializer.data)

#CUSTOMER VIEW 
class CustomerView(APIView):
    def get(self,request,pk=None,format=None):
        id=pk
        if id is not None:
            customer=Customer.objects.get(id=id)
            serializer=CustomerSerializers(customer)
            return Response(serializer.data)

    def post(self,request,format=None):
        serializer=CustomerSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Customer Created'},status=Stats.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    
    def put(self,request,pk,fromat=None):
            id=pk
            pro=Customer.objects.get(id=id)
            serializer=CustomerSerializers(pro,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'msg':'Complete Customer Updated'})
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)