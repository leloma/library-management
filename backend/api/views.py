from rest_framework.views import APIView
from .serializers import UserSerializer, BookSerializer
from .models import User, Book
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.views.generic import DetailView


# Simple JWT Authentication tokenization view
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['fullname'] = user.fullname

        return token
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Create a new user
class AddUserView(APIView):
    serializer_class = UserSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(): 
            fullname = serializer.data.get('fullname')
            
            email = serializer.data.get('email')
            password = make_password(serializer.data.get('password'))
            user = User(fullname = fullname, email = email, password = password)
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

        # return Response({'Bad Request': 'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)
    # messages.info(request, serializer.errors)
        default_errors = serializer.errors
        new_error = {}
        for field_name, field_errors in default_errors.items():
            new_error[field_name] = field_errors[0]
        return Response(new_error, status=status.HTTP_400_BAD_REQUEST)       
        # return Response(serializer.errors)

# @permission_classes([IsAuthenticated])


class BookCreateAPIView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookListAPIView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer




class UpdateBookAPIView(generics.UpdateAPIView):
    model = Book
    serializer_class = BookSerializer
    fields = ['bookname', 'image', 'description', 'author' ]
    template_name = "book_update.html"

class BookView(APIView):
    serializer_class = BookSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            bookname = serializer.data.get('bookname')
            author = serializer.data.get('author')
            image = serializer.data.get('image')
            description = serializer.data.get('description')
            added_by = serializer.data.get('added_by')
            
            book = Book(bookname=bookname, author=author, image=image,  description=description, added_by= User.objects.get(id = added_by))
            book.save()
            return Response(BookSerializer(book).data, status=status.HTTP_201_CREATED)
        
        default_errors = serializer.errors
        new_error = {}
        for field_name, field_errors in default_errors.items():
            new_error[field_name] = field_errors[0]
        return Response(new_error, status=status.HTTP_400_BAD_REQUEST)  

    def get(self, request, format=None):
        # user = request.user
        # book = user.book_set.all()
        book = Book.objects.all()
        serializer = self.serializer_class(book, many=True)
        data = serializer.data
        return Response(data, status=status.HTTP_200_OK)
    

class BookDetailView(APIView):
    serializer_class = BookSerializer
    

    def getbookid(self, id):
        return Book.objects.get(id=id)
    
    def get(self, request, *args, **kwargs):
        id = self.kwargs.get('id')
        book = Book.objects.filter(id=id)
        serializer = self.serializer_class(book, many=True)
        data = serializer.data
        return Response(data, status=status.HTTP_200_OK)
    
    def delete(self, request, *args, **kwargs):
        id = self.kwargs.get('id')

        try: 
            book = self.getbookid(id=id)
        except Book.DoesNotExist:
            msg = {"msg": "There is no book with that ID"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)
        
        book.delete()
        return Response({'message': 'Book was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
    def patch(self, request, *args, **kwargs):
        id = self.kwargs.get('id')
        try: 
            book = self.getbookid(id=id)
        except book.DoesNotExist:
            msg = {"msg": "There is no book with that id"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)
        serializer = BookSerializer(book, data=request.data, partial=True) # set partial=True to update a data partially
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            

    
    




