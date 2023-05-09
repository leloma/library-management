from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import UserManager
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.hashers import make_password


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    # REQUIRED_FIELDS = (['user_id',  'password'])
    fullname = models.CharField(max_length=100, null=False, default='No Name')
    email = models.EmailField(unique=True, max_length=50, null=False)
    password = models.CharField(max_length=300, null=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    
    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['fullname', 'password']
    objects = UserManager()
    def __str__(self):
        return self.fullname


def imageuploadpath(instance, filename):
    # return "/".join(['bookcovers', str(instance.bookname), filename])
    return 'images/{filename}'.format(filename=filename)


class Book(models.Model):
    bookname = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(null=False, upload_to='myimages/')
    author = models.CharField(max_length=30, default='Guest')
    description = models.TextField(default='Available in DIU')
    added_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.bookname


