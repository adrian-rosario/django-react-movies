<a id='top'></a>

# django-react-movies

## Version

- Current version: **1.0.0**

Web application showcasing movie descriptions, ratings, and images for users. Built with Django and React.

The application allows users to post movies, upload an image, and rate movies with comments. There are admin screens and endpoints for managing the movies, users, and ratings. The project integrates a RESTful API with a React frontend.

- **Backend**: [Django](#django) Rest Framework, Simple JWT, Pillow
  - API Documentation: [Movies](#api-movies) , [Users](#api-users)
- **Frontend**: [React](#react), React Router, React Bootstrap, Font Awesome, Vite, Axios, Redux
- **Database**: SQLite

## Usage

Fom the home page, unauthenticated users can access the movies list and movie details, the Mission page, and Login. From the Login page uses can register. Once authenticated, users can create, rate, and comment on movies, as well as edit their user profile. Admins can manage users, movies, and ratings.

<div style='display:flex;align-items: center;justify-content: center;' >
<img src='/screenshots/home.png' alt='home' style='width: 200px;' />
<img src='/screenshots/mission.png' alt='mission' style='width: 200px;' />
<img src='/screenshots/login.png' alt='login' style='width: 200px;' />
</div>

<div style='display:flex;align-items: center;justify-content: center;' ><img src='/screenshots/register.png' alt='register' style='width: 200px;' />
<img src='/screenshots/user-profile.png' alt='user-profile' style='width: 200px;' />
<img src='/screenshots/movie.png' alt='movie' style='width: 200px;' />
</div>

<div style='display:flex;align-items: center;justify-content: center;' ><img src='/screenshots/add-movie.png' alt='add-movie' style='width: 200px;' />
<img src='/screenshots/edit-movie.png' alt='edit-movie' style='width: 200px;' />
<img src='/screenshots/admin-movies.png' alt='admin-movies' style='width: 200px;' />
</div>

<div style='display:flex;align-items: center;justify-content: center;' ><img src='/screenshots/admin-users.png' alt='admin-users' style='width: 200px;' />
<img src='/screenshots/admin-user.png' alt='admin-user' style='width: 200px;' />
<img src='/screenshots/admin-all-ratings.png' alt='admin-all-ratings' style='width: 200px;' />
</div>

<a id="django"></a>

[Top](#top)

### **Backend, Django**

```plaintext
movies/
├── movieplatform/          # Main Django project folder
│   ├── settings.py         # Django settings
│   ├── urls.py             # Main URL routing
│   ├── wsgi.py             # WSGI entry point for deployment
│
├── movieapp/               # Django app folder
│   ├── migrations/         # Database migration files
│   ├── models.py           # Database models
│   ├── views/              # API views
│   ├── urls/               # URL routing
│   ├── serializers.py      # Data serializers for the API
│
├── images/                # User uploaded images
├── manage.py              # Django management commands
└── requirements.txt       # Project dependencies
```

#### **Django Setup Instructions**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/adrian-rosario/django-react-movies.git
   cd movies/
   ```

2. **Create a virtual environment** (optional, but recommended):

   ```bash
   virtualenv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install dependencies**:

   ```bash
   cd ./movieplatform/
   pip install -r requirements.txt
   ```

4. **Add an environment variable to your system**:

   ```bash
   export MOVIE_APP_KEY="yourSecretKey"
   ```

5. **Run migrations**:

   ```bash
   python manage.py migrate
   ```

6. **Create a superuser**:

   ```bash
   python manage.py createsuperuser
   ```

7. **Start the backend server**:

   ```bash
   python manage.py runserver
   ```

8. **Access the backend**:

   - The API will be available at `http://127.0.0.1:8000/`

9. **Admin panel**:
   Create initial movies and ratings data so the frontend has data to render, The admin panel can be accessed with the superuser credentials at `http://127.0.0.1:8000/admin`

---

<a id="react"></a>

[Top](#top)

### **Frontend, React**

```plaintext
frontend/
├── movies-web/
├──── src/
├────── assets/
├────── components/
├──────── view-ui/          # Shared UI, header, footer, stars, etc.
├──────── views/            # Pages
├────── state/
├──────── actions/          # Movie actions, user actions
├──────── reducers/         # Movie reducers, user reducers
├────── util/               # Constants
└──
```

#### **React Setup Instructions**

1. **Clone the repository, if not already cloned**:

   ```bash
   git clone https://github.com/adrian-rosario/django-react-movies.git
   cd frontend/movies-web/
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the frontend server**:

   ```bash
   npm run dev
   ```

4. **Access the frontend**:
   - The React application will be available at `http://localhost:5173/`.

---

<a id="api-movies"></a>

[Top](#top)

## API Endpoints, Movies

### GET /api/movies/

- **Description**: Retrieve list of movies
- **Authentication**: None
- **Request Body**: None
- **Response**:
  ```json
  [
    {
      "id": 14,
      "title": "The Roaring Twenties",
      "description": "A crime drama ...",
      "number_of_ratings": 3,
      "ratings_average": 3.3333333333333335,
      "image": "/images/uu-id.jpg",
      "year": 1939,
      "director": "Raoul Walsh",
      "starring": "James ...",
      "cinematographer": "Ernest Haller"
    }
  ]
  ```

### GET /api/movie/{movie_id}

- **Description**: Retrieve movie.
- **Authentication**: None
- **Request Body**: None
- **Response**:
  ```json
  {
    "id": 10,
    "title": "Casablanca",
    "description": "Set during ...",
    "number_of_ratings": 3,
    "ratings_average": 3.3333333333333335,
    "image": "/images/uu-id.jpg",
    "year": 1942,
    "director": "Michael Curtiz",
    "starring": "Humphrey ...",
    "cinematographer": "Arthur Edeson"
  }
  ```

### GET /api/ratings/

- **Description**: Retrieve list of ratings
- **Authentication**: Yes, admin
- **Request Body**: None
- **Response**:
  ```json
  [
    {
      "id": 11,
      "rating": 5,
      "comment": "I loved ... ",
      "movie": 9,
      "user": 10
    },
    {
      "id": 13,
      "rating": 0,
      "comment": "big ...",
      "movie": 11,
      "user": 10
    }
  ]
  ```

### GET /api/rating/{rating_id}

- **Description**: Retrieve a rating
- **Authentication**: None
- **Request Body**: None
- **Response**:
  ```json
  {
    "id": 11,
    "rating": 5,
    "comment": "I loved ...",
    "movie": 9,
    "user": 10
  }
  ```

### GET /api/rating/random/

- **Description**: Retrieve a random rating, including the name of the rating author
- **Authentication**: None
- **Request Body**: None
- **Response**:
  ```json
  {
    "rating": {
      "id": 11,
      "rating": 5,
      "comment": "I loved the ... ",
      "movie": 9,
      "user": 10
    },
    "user": "Thomas",
    "movie": "The Maltese Falcon"
  }
  ```

### GET /api/ratings/for-movie/{movie_id}

- **Description**: List ratings for a movie
- **Authentication**: None
- **Request Body**: None
- **Response**:

```json
[
  {
    "id": 13,
    "rating": 0,
    "comment": "big ...",
    "movie": 11,
    "user": 10
  },
  {
    "id": 36,
    "rating": 4,
    "comment": "Well-paced ...",
    "movie": 11,
    "user": 12
  },
  {
    "id": 39,
    "rating": 4,
    "comment": "Gritty ...",
    "movie": 11,
    "user": 11
  }
]
```

### POST /api/movies/new-movie/

- **Description**: Add a new movie
- **Authentication**: Yes, user
- **Request Body**:

```json
{
  "title": "movie added by postman POST",
  "director": "somebody",
  "starring": "peaople, animals",
  "cinematographer": "person, perons",
  "year": "1945",
  "description": "words appear here"
}
```

- **Response**:

```json
{
  "id": 28,
  "title": "movie added by postman POST",
  "description": "words appear here",
  "number_of_ratings": 0,
  "ratings_average": 0,
  "image": "/images/temp-image.png",
  "year": 1945,
  "director": "somebody",
  "starring": "peaople, animals",
  "cinematographer": "person, perons"
}
```

### POST /api/new-rating/{movie_id}

- **Description**: Add a new review for movie
- **Authentication**: Yes, user
- **Request Body**:

```json
{
  "rating": "3",
  "comment": "great"
}
```

- **Response**:

```json
{
  "id": 40,
  "rating": 3,
  "comment": "great",
  "movie": 28,
  "user": 1
}
```

### POST /api/image/

- **Description**: Add image to movie
- **Authentication**: Yes, user
- **Request Body**:

```json
{
  "movieId": "movie_id",
  "image": "image_file"
}
```

- **Response**:
  `"Image uploaded successfully"`

### PUT /api/edit/{movie_id}

- **Description**: Edit movie
- **Authentication**: Yes, user
- **Request Body**:

```json
{
  "title": "movie updated by postman PUT",
  "director": "somebody baxter",
  "starring": "peaople, animals, places",
  "cinematographer": "person, perons, teams",
  "year": "1962",
  "description": "more words appear here"
}
```

- **Response**:

```json
{
  "id": 28,
  "title": "movie updated by postman PUT",
  "description": "more words appear here",
  "number_of_ratings": 2,
  "ratings_average": 2.5,
  "image": "/images/temp-image.png",
  "year": 1962,
  "director": "somebody baxter",
  "starring": "peaople, animals, places",
  "cinematographer": "person, perons, teams"
}
```

### DELETE /api/movies/delete/{movie_id}

- **Description**: Delete movie
- **Authentication**: Yes, admin
- **Request Body**: None
- **Response**:
  `"Movie deleted successfully"`

### DELETE /api/rating/delete/{rating_id}

- **Description**: Delete Rating
- **Authentication**: Yes, admin
- **Request Body**: None
- **Response**:
  `"Rating deleted successfully"`

---

<a id="api-users"></a>

[Top](#top)

## API Endpoints, Users

### GET /user/profile/

- **Description**: Retrieve user details
- **Authentication**: Yes, user
- **Request Body**: None
- **Response**:
  ```json
  {
    "id": 1,
    "username": "userEmail",
    "email": "userEmail",
    "name": "Example",
    "is_admin": true
  }
  ```

### GET /user/{user_id}

- **Description**: Admin, retrieve user details
- **Authentication**: Yes, admin
- **Request Body**: None
- **Response**:
  ```json
  {
    "id": 8,
    "username": "userEmail",
    "email": "userEmail",
    "name": "userName",
    "is_admin": false
  }
  ```

### GET /user/users/

- **Description**: Admin, retrieve list of users
- **Authentication**: Yes, admin
- **Request Body**: None
- **Response**:
  ```json
  [
    {
      "id": 1,
      "username": "userOneEmail",
      "email": "userOneEmail",
      "name": "userOneName",
      "is_admin": true
    },
    {
      "id": 6,
      "username": "userTwoEmail",
      "email": "userTwoEmail",
      "name": "userTwoName",
      "is_admin": false
    }
  ]
  ```

### POST /user/token/

- **Description**: User login, acquire JSON Web Token
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "username": "testUserEmail",
    "password": "testUserPassword"
  }
  ```
- **Response**:
  ```json
  {
    "refresh": "jsonWebTokenValue",
    "access": "jsonWebTokenValue",
    "id": 1,
    "username": "userEmail",
    "email": "userEmail",
    "name": "User",
    "is_admin": true,
    "token": "jsonWebTokenValue"
  }
  ```

### POST /user/new/

- **Description**: Add new user
- **Authentication**: None
- **Request Body**:

```json
{
  "name": "Person",
  "email": "person@email.com",
  "password": "userPassword123"
}
```

- **Response**:

```json
{
  "id": 17,
  "username": "person@email.com",
  "email": "person@email.com",
  "name": "Person",
  "is_admin": false
}
```

### PUT /user/update/

- **Description**: User, update profile
- **Authentication**: Yes, user
- **Request Body**:
  - if password is empty there's no change to the value

```json
{
  "username": "person@email.com",
  "email": "person@email.com",
  "name": "Person Z",
  "password": ""
}
```

- **Response**:

```json
{
  "id": 17,
  "username": "person@email.com",
  "email": "person@email.com",
  "name": "Person Z",
  "is_admin": false,
  "token": "jsonWebToken"
}
```

### PUT /user/admin/update-user/{user_id}

- **Description**: Admin, update user
- **Authentication**: Yes, admin
- **Request Body**:

```json
{
  "username": "person@email.com",
  "email": "person@email.com",
  "name": "Person Q",
  "is_admin": true
}
```

- **Response**:

```json
{
  "id": 17,
  "username": "person@email.com",
  "email": "person@email.com",
  "name": "Person Q",
  "is_admin": true
}
```

### DELETE /user/delete/{user_id}

- **Description**: Delete user
- **Authentication**: Yes, admin
- **Request Body**: None
- **Response**:
  `"User deleted."`

[Top](#top)
