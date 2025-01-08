from rest_framework import serializers
from django.contrib.auth.models import User 
from .models import Movie, Rating
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MovieSerializer(serializers.ModelSerializer):
  class Meta:
    model = Movie 
    fields = ['id', 'title', 'description', 'number_of_ratings', 'ratings_average', 'image', 'year', 'director', 'starring', 'cinematographer'] #'__all__'
    
class RatingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Rating
    fields = '__all__'    

  def get_user(self,obj):
    user = obj.user
    serializer = UserSerializer(user, many=False)
    return serializer.data
    
class UserSerializer(serializers.ModelSerializer):   
  name = serializers.SerializerMethodField(read_only=True)
  is_admin = serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'name', 'is_admin']
  
  def get_is_admin(self,obj):
    is_admin = obj.is_staff
    return is_admin  
    
  def get_name(self, obj):
    name = obj.first_name
    if name == '':
      name = obj.email
      
    return name
    
class UserWithRefreshTokenSerializer(UserSerializer):
  token = serializers.SerializerMethodField(read_only=True)

  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'name', 'is_admin', 'token']
      
  def get_token(self, obj):
    token = RefreshToken.for_user(obj)
    return str(token.access_token)    
  
class MovieAppTokenObtainPairSerializer(TokenObtainPairSerializer):
  def validate(self, attrs):
    data = super().validate(attrs)
    
    # data['username'] = self.user.username
    # data['email'] = self.user.email
    serializer = UserWithRefreshTokenSerializer(self.user).data
    
    for k,v in serializer.items():
      data[k] = v
    
    return data   