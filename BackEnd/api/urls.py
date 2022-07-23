
from xml.dom.minidom import Document
from django.urls import path,include

from api import views
urlpatterns = [
    path('register/', views.UserRegistrationView.as_view(),name='register'),
    path('login/', views.UserLoginView .as_view(),name='login'),
    path('productapi/', views.ProductView .as_view(),name='productView'),
    path('productapi/<int:pk>/', views.ProductView .as_view(),name='productView'),
    path('customerapi/<int:pk>/', views.CustomerView .as_view(),name='customerView'),
    path('categoryapi/', views.CategoryView .as_view(),name='categoryview'),
    
]
