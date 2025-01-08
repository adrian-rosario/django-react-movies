from django.urls import path
from movieapp.views import movie_views as views

from django.conf.urls import include
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    # get
    path('', include(router.urls)), # -- 
    path('movies/', views.list_movies, name="movies_list"),
    path('movie/<int:id>', views.list_movie, name="movie"),
    path('ratings/', views.admin_list_ratings, name="ratings_list"),
    path('rating/<int:id>', views.list_rating, name="rating"),  
    path('ratings/for-movie/<int:id>', views.list_ratings_for_movie, name='ratings_for_movie'),

    path('rating/random/', views.listRandomRating, name="random_rating"),

    # post
    path('movies/new-movie/', views.add_movie, name="add_movie"),
    path('new-rating/<int:id>', views.add_rating, name="add_rating"),
    path('image/', views.upload_movie_image, name='movie_add_image'),

    # put
    path('edit/<int:id>', views.edit_movie, name="edit_movie"),

    # delete
    path('movies/delete/<int:id>', views.delete_movie, name="delete_movie"),
    path('rating/delete/<int:id>', views.delete_rating, name="delete_rating")
]