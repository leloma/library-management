from rest_framework import serializers
from .models import User, Book


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'fullname', 'password']

        # extra_kwargs = {"fullname": {"error_messages": {"required": "Please enter your fullname"}}}

    # def validate(self, data):
    #     if User.objects.filter(email = data.email).exists():
    #         raise serializers.ValidationError("ABCDEFG")
        
    #     return data
    # def create(self, validated_data):
    #     if User.objects.filter(email=self.context["request"].email).exists():
    #         raise serializers.ValidationError("User Already exists.")
    #     user = User.objects.create(**validated_data)
        # return user

class BookSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Book
        fields = '__all__'

