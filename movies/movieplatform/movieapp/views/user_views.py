from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from movieapp.serializers import UserSerializer, UserWithRefreshTokenSerializer 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User 
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from rest_framework import status
from django.contrib.auth.hashers import make_password
  
class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = TokenObtainPairSerializer
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user_profile(request):
  user = request.user 
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_all_users_by_admin(request):
  users = User.objects.all()
  serializer = UserSerializer(users, many=True)
  return Response(serializer.data)    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_user_profile_by_admin(request, id):
  user = User.objects.get(id=id)
  serializer= UserSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['POST'])
def register_new_user(request):
  data = request.data 
  
  try:
    new_user = User.objects.create(
      first_name = data['name'],
      username = data['email'].lower(),
      email = data['email'].lower(),
      password = make_password(data['password'])      
    )
    serializer = UserSerializer(new_user, many=False)
    return Response(serializer.data)
    
  except:
    message = {'detail': 'This username has been registered.'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)
  

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
  user = request.user 
  serializer = UserWithRefreshTokenSerializer(user, many=False)
  data = request.data 
  user.first_name = data['name']  
  user.email = data['email']
  user.username = data['email']
  if data['password'] != '':
    user.password = make_password(data['password'])
  user.save()
  return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_user_profile_by_admin(request, id):
  user = User.objects.get(id=id)
  data = request.data 
  # print('data: ', data)
  user.first_name = data['name']
  user.email = data['email']
  user.username = data['email']
  user.is_staff = data['is_admin']
  user.save()
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, id):
  user_to_delete = User.objects.get(id=id)
  user_to_delete.delete()
  return Response('User deleted.')

