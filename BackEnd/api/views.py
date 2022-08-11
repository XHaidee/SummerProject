from audioop import add
import io
from turtle import Turtle

from urllib3 import HTTPResponse
from rest_framework.parsers import JSONParser
from functools import partial
from pstats import Stats
from django.shortcuts import render

# from BackEnd.api import serializers
from rest_framework.permissions import IsAuthenticated
from .models import Products,Category,User,Customer,Items,Order
from api.serializers import UserLoginSerializer,ProductsSerializers, UserRegistrationSerializer,CategorySerializers,CustomerSerializers,UserProfileSerializer,OrderSerializers,ItemSerializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import requests

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
                if user.is_staff:
                     token=get_tokens_for_user(user)
                     return Response({'token':token,'admin':'1'},status=status.HTTP_200_OK)
                token=get_tokens_for_user(user) 
                return Response({'token':token,'msg':'Login Success'},status=status.HTTP_200_OK)
            else:
                 return Response({'errors':{'non_field_errors':['Emaol or passwrod is not valid']}},status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        serializer=UserProfileSerializer(request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)

# class UserChangePasswrod(APIView):
#     permission_classes = [IsAuthenticated]
#     def post(self,request,format=None):
#         serializer=UserChangePasswrodSerializer(data=request.data)


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
    permission_classes = [IsAuthenticated]
    def get(self,request,pk=None,format=None):
        id=pk
        if id is not None:
            customer=Customer.objects.get(id=id)
            serializer=CustomerSerializers(customer)
            print(request.user)
            return Response(serializer.data)

    def post(self,request,format=None):
        serializer=CustomerSerializers(data=request.data)
        if serializer.is_valid():
            user=request.user
            print(user)
            name=serializer.validated_data.get('name')
            phone=serializer.validated_data.get('phone')
            address=serializer.validated_data.get('address')
            reg=Customer(name=name,phone=phone,address=address,user=user)
            reg.save()
            return Response({'msg':'Customer Created'},status=Stats.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    
    def put(self,request,pk,fromat=None):
            id=pk
            pro=Customer.objects.get(id=id)
            serializer=CustomerSerializers(pro,data=request.data)
            if serializer.is_valid():
                user=request.user
                name=serializer.validated_data.get('name')
                phone=serializer.validated_data.get('phone')
                address=serializer.validated_data.get('address')
                reg=Customer(name=name,phone=phone,address=address,user=user)
                reg.save()
                return Response({'msg':'Complete Customer Updated'})
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


#ORDER PART FROM HERE

class OrderView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,format=None):
        data=request.body
        stream=io.BytesIO(data)
        pythondata=JSONParser().parse(stream)
        customerId=User.objects.get(name=request.user)
        customer=Customer.objects.get(user=customerId)
        items=pythondata.get('items')
        amount=pythondata.get('amount')
        quantity=pythondata.get('quantity')
        Order.objects.create(customer=customer,quantity=quantity,total=amount)
        orders=Order.objects.order_by('-id')
        id=orders[0]
        for a in items:
            print(id)
            product=Products.objects.get(id=a['id'])
        # print(customer)
            Items.objects.create(order=id,products=product,quantitys=a['cartQuantity'])
        #HERE IS AN ISSUE 
            return Response({'msg':'order Created'})
        # return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def get(self,request,format=None):
        
            customer=Customer.objects.get(user=request.user)
            orders=Order.objects.filter(customer=customer)
            serializer=OrderSerializers(orders, many=True)
            itm=[]
            print(serializer.data)
            for a in orders:
                order=a
                # print(order)
                b=order.items_set.all()
                sz=ItemSerializers(b,many=True)
                

                print(b)

                
            return Response({'data':serializer.data,'s':itm} )



# KHALTI SERVER VALIDATION

class verify_payment(APIView):
  def post(self,request,*args,**kwargs):
    print(request.data)
    token=request.data.get('va',{}).get('token')
    amount=request.data.get('va',{}).get('amount')
    print(token)
    print(amount)
    url = "https://khalti.com/api/v2/payment/verify/"
    payload = {
    "token": token,
    "amount": amount
    }
    headers = {
    "Authorization": "Key test_secret_key_f0c6c0df05e644dbacc81ee75701ad03"
    }
    
    response = requests.post(url, payload, headers = headers)
    # print(response.status)
    # response_data=json.loads(response)
    # status_code=str(response.status)
    # if status_code=='400':  
    #      return Response({'status':'false fail','message':response_data['detail']},status=500)
    # if str(response.status)==200:
    print(type(response))
    return Response({'data':response,'status':'sucess'},)
    # return Response({"fail":"fail response"})


    
