from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from movieapp.models import Movie, Rating, User
from movieapp.serializers import MovieSerializer, RatingSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from rest_framework import status

@api_view(['GET'])
def placeholderView(request):
  return Response('api view, responding, OK')

@api_view(['GET'])
def list_movies(request):
  movies = Movie.objects.all().order_by('year')
  serializer = MovieSerializer(movies, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def list_movie(request, id):
  movie = Movie.objects.get(id=id)
  serializer = MovieSerializer(movie, many=False)
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_list_ratings(request):
  ratings = Rating.objects.all()
  serializer = RatingSerializer(ratings, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def list_rating(request, id):
  rating = Rating.objects.get(id=id)
  serializer = RatingSerializer(rating, many=False)
  return Response(serializer.data)

@api_view(['GET'])
def list_ratings_for_movie(request, id):
  ratings = Rating.objects.filter(movie=id)
  serializer = RatingSerializer(ratings, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def listRandomRating(request):
  random_record = Rating.objects.order_by('?').first()
  random_record_movie = random_record.movie.title
  random_record_user_firstname = random_record.user.first_name
  serializer = RatingSerializer(random_record, many=False)
  return Response({"rating": serializer.data, "user": random_record_user_firstname, 'movie': random_record_movie})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_movie(request):
  data = request.data
  user = request.user

  try:
    new_movie = Movie.objects.create(
      title = data['title'],
      year = data['year'],
      director = data['director'],
      starring = data['starring'],
      cinematographer = data['cinematographer'],
      description = data['description'],
      user = user
    )
    
    serializer = MovieSerializer(new_movie, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
    
  except:
    message = {'detail': 'There was a problem adding the movie.'}
    return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_rating(request, id):
  data = request.data 
  user = request.user 
  
  theMovie = Movie.objects.get(id=id)
  
  reviewExists = theMovie.rating_set.filter(user=user).exists()

  if reviewExists:
    # user has already submitted a review for this movie
    content = {'detail': 'You have already reviewed this movie.'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)  
  
  if 'rating' in request.data:
    try:
      new_rating = Rating.objects.create(
        movie = theMovie,
        user = user,
        rating = data['rating'],
        comment = data['comment']
      )
      
      serializer = RatingSerializer(new_rating, many=False)
      return Response(serializer.data, status=status.HTTP_201_CREATED)

    except:
      message = {'detail': 'There was a problem adding the rating.'}
      return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
  else:  
    content = {'detail': 'A rating value is required.'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)  
  
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_movie_image(request):
  data = request.data     
  print('image data ', data)
  print('image request', request)
  movie_id = data['movieId']
  movie = Movie.objects.get(id=movie_id)
  movie.image = request.FILES.get('newImage')
  movie.save()
  return Response('Image uploaded successfully')
  
  
@api_view(['PUT'])
@permission_classes([IsAuthenticated])  
def edit_movie(request,id):
  user = request.user
  movie_to_edit = Movie.objects.get(id=id)
  data_to_put = request.data 

  movie_to_edit.title = data_to_put['title']
  movie_to_edit.description = data_to_put['description']
  movie_to_edit.year = data_to_put['year']
  movie_to_edit.director = data_to_put['director']
  movie_to_edit.starring = data_to_put['starring']
  movie_to_edit.cinematographer = data_to_put['cinematographer']
  
  # if no image in request, use existing image 
  movie_to_edit.image = movie_to_edit.image
  movie_to_edit.user = user 

  movie_to_edit.save()
  serializer = MovieSerializer(movie_to_edit, many=False)
  return Response(serializer.data, status=status.HTTP_201_CREATED) 


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_movie(request,id):
  movie_to_delete = Movie.objects.get(id=id)
  movie_to_delete.delete()
  return Response('Movie deleted successfully', status=status.HTTP_202_ACCEPTED)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_rating(request,id):
  rating_to_delete = Rating.objects.get(id=id)
  rating_to_delete.delete()
  return Response('Rating deleted successfully', status=status.HTTP_202_ACCEPTED)