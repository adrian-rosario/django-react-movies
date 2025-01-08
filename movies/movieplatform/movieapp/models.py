from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
import uuid
from django.core.exceptions import ValidationError
import datetime

def generate_unique_filename(instance, filename):
    ext = filename.split('.')[-1]
    return f"{uuid.uuid4()}.{ext}"

def validate_year(value):
    current_year = datetime.datetime.now().year
    if value < 1888 or value > current_year:
        raise ValidationError(f'Year must be between 1888 and {current_year}.')

class Movie(models.Model):
  title = models.CharField(max_length=100, blank=False)
  director = models.CharField(max_length=100, blank=False)
  starring = models.CharField(max_length=150, blank=False)
  cinematographer = models.CharField(max_length=100, blank=False)
  year = models.IntegerField(validators=[validate_year], blank=False)
  description = models.CharField(max_length=400, blank=False)
  user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
  image = models.ImageField(default='/temp-image.png', upload_to=generate_unique_filename)
  def __str__(self):
      return self.title
    
  def number_of_ratings(self):
    ratings = Rating.objects.filter(movie=self)    
    return len(ratings)

  def ratings_average(self):
    sum = 0
    ratings = Rating.objects.filter(movie=self)
    for item in ratings:
      sum += item.rating
    if len(ratings) > 0:
      return sum / len(ratings)
    else:
      return 0  

class Rating(models.Model):
  movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])  
  comment = models.TextField(max_length=400, null=True, blank=True)
  class Meta:
    unique_together = (("user", "movie"))     # so user can submit only one rating per movie
    # index_together = (("user", "movie")) # no longer supported, deprecated in favor of using the Index class directly 
    
  def __str__(self):
    return self.movie.title
  
  