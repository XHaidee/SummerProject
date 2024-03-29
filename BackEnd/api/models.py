
from email.policy import default
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser



class UserManager(BaseUserManager):
    def create_user(self, email, name,tc, password=None,password2=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            tc=tc,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name,tc, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            name=name,
            tc=tc,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=200)
    tc = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','tc']

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


#STARTING THE OTHE MODELS REQUIRED IN THE DATABASE

#THE CUSTOMER MODEL 
class Customer(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    name=models.CharField(max_length=200)
    phone=models.IntegerField()
    address=models.CharField(max_length=50)
    
    def __str__(self):
        return str(self.user)

#THE CATEGORY MODEL
class Category(models.Model):
    
    category_name=models.CharField(max_length=255)
    def __str__(self) :
        return self.category_name


#THE PRODUCT MODEL
class Products(models.Model):
    product_name=models.CharField(max_length=255)
    category=models.ForeignKey(Category,on_delete=models.CASCADE)
    price=models.IntegerField()
    quantity=models.IntegerField(default=1)
    desc=models.CharField(max_length=255)
    image=models.ImageField(upload_to='images',default="")

    def __str__(self):
        return self.product_name

# THE ORDERS MODEL
STATUS_CHOICES=(('Accepted','Accepted'),
('packed','packed'),
('on the way','on the way'),
('delivered','delivered'),
('cancel','cancel')
)
class Order(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    quantity=models.PositiveBigIntegerField(default=1)
    total=models.PositiveBigIntegerField()
    ordered_date=models.DateTimeField(auto_now_add=True)
    status=models.CharField(max_length=50,choices=STATUS_CHOICES,default='pending')
    def __int__(self):
        return self.id

class Items(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE)
    products=models.ForeignKey(Products,on_delete=models.CASCADE)
    quantitys=models.PositiveIntegerField(default=1)
    def __int__(self):
        return self.id
    


    
