import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Image, Row, Col, Button } from "react-bootstrap";
import { movie_constants as constants } from "../../util/constants_movie";
import {
  movieDetailAction,
  addMovieImageAction,
  updateMovieAction,
  listMoviesAction,
} from "../../state/actions/movie";
import AlertMessage from "../view-ui/AlertMessage";
import LoadingSpinner from "../view-ui/LoadingSpinner";

export default function EditMovie() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [starring, setStarring] = useState("");
  const [cinematographer, setCinematographer] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get user state, redirect if not logged in
  const userLoginState = useSelector((state) => state.userLogin);
  const {
    userDetails: loggedInUser,
    /*loading: loadingLoggedInUserDetails,*/
    error: errorLoadingLoggedInUserDetails,
  } = userLoginState;

  // get movie detail state
  const movieDetailsState = useSelector((state) => state.movieDetail);
  const {
    movie,
    error: errorLoadingMovie,
    loading: loadingMovie,
  } = movieDetailsState;

  const addMovieImageState = useSelector((state) => state.movieImagePost);
  const {
    loading: addImageLoading,
    details: detailsAddImage,
    error: errorAddImage,
  } = addMovieImageState;

  const updateMovieState = useSelector((state) => state.movieUpdatePost);
  const {
    loading: loadingMovieUpdate,
    details: detailsMovieUpdate,
    error: errorMovieUpdate,
  } = updateMovieState;

  useEffect(() => {
    const resetForm = () => {
      setTitle(movie.title);
      setDescription(movie.description);
      setExistingImage(movie.image);
      setYear(movie.year);
      setDirector(movie.director);
      setStarring(movie.starring);
      setCinematographer(movie.cinematographer);
      setUploadImage("");
    };

    if (!loggedInUser || errorLoadingLoggedInUserDetails) {
      navigate("/login");
    }

    let pathMatchesData;
    if (movie && movie.id) {
      pathMatchesData = parseInt(movie.id) === parseInt(id);
    }

    // refresh data, previous movie data is in the store
    if (!pathMatchesData) {
      dispatch({ type: constants.MOVIE_DETAIL_RESET });
      dispatch(movieDetailAction(id));
    }

    if (
      detailsAddImage &&
      Object.keys(detailsAddImage).length > 0 &&
      detailsAddImage.includes("successfully")
    ) {
      setTimeout(() => {
        // delay before dismissing the success message
        dispatch({ type: constants.MOVIE_ADD_IMAGE_RESET });
      }, 1000);

      setTimeout(() => {
        // delay so the success message can be seen before freshing movie
        dispatch({ type: constants.MOVIE_DETAIL_RESET });
        dispatch(listMoviesAction());

        // get all movies...
        dispatch(movieDetailAction(id));
        if (movie && movie.id) {
          resetForm();
        }
      }, 1500);
    }

    if (detailsMovieUpdate && detailsMovieUpdate.id) {
      setTimeout(() => {
        dispatch({ type: constants.MOVIE_POST_UPDATE_RESET });
      }, 1000);
      setTimeout(() => {
        // reload all movies
        dispatch(listMoviesAction());
        dispatch(movieDetailAction(id));
        if (movie && movie.id) {
          resetForm();
        }
      }, 1500);
    }

    if (movie && movie.id) {
      resetForm();
    }
  }, [
    loggedInUser,
    errorLoadingLoggedInUserDetails,
    navigate,
    dispatch,
    id,
    movie,
    detailsAddImage,
    detailsMovieUpdate,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = {
      title,
      description,
      year,
      director,
      starring,
      cinematographer,
    };

    dispatch(updateMovieAction(id, fields));
  };

  // show preview of image to upload
  const handleImageUploadPrep = (e) => {
    const imageFile = e.target.files[0];
    setUploadImage(imageFile);
  };

  const handleImageUpload = () => {
    const imageUploadFormData = new FormData();
    imageUploadFormData.append("newImage", uploadImage);
    imageUploadFormData.append("movieId", id);

    if (window.confirm(`Are you sure you want to upload this image?`)) {
      dispatch(addMovieImageAction(imageUploadFormData));
    }
  };

  return (
    <div className='mt-4 w-75 mx-auto'>
      <h3>
        {loggedInUser && loggedInUser.is_admin ? "Admin, " : ""} Edit:&nbsp;
        {movie && movie.title}
      </h3>

      {loggedInUser && loggedInUser.is_admin && (
        <Link to={"/admin-movies"}>All Movies</Link>
      )}

      {errorLoadingMovie && <AlertMessage>{errorLoadingMovie}</AlertMessage>}
      {loadingMovie && <LoadingSpinner />}

      {loadingMovieUpdate && <LoadingSpinner />}
      {errorMovieUpdate && (
        <AlertMessage variant='danger'>{errorMovieUpdate}</AlertMessage>
      )}

      {detailsMovieUpdate && detailsMovieUpdate.id && (
        <AlertMessage variant='info'>Movie Updated!</AlertMessage>
      )}

      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='title' className='my-3 mt-4'>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Movie title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='year' className='my-3 mt-4'>
              <Form.Label>Year:</Form.Label>
              <Form.Control
                type='text'
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='director' className='my-3 mt-4'>
              <Form.Label>Director:</Form.Label>
              <Form.Control
                type='text'
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='starring' className='my-3 mt-4'>
              <Form.Label>Starring:</Form.Label>
              <Form.Control
                type='text'
                value={starring}
                onChange={(e) => setStarring(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='cinematographer' className='my-3 mt-4'>
              <Form.Label>Cinematographer:</Form.Label>
              <Form.Control
                type='text'
                value={cinematographer}
                onChange={(e) => setCinematographer(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='description' className='my-3 mt-4'>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type='text'
                as='textarea'
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              <i className='fas fa-pen-to-square'></i> &nbsp;Edit Movie
            </Button>
          </Form>
        </Col>
        <Col>
          <Form.Group controlId='image' className='my-3 mt-4'>
            <Form.Label>Image:</Form.Label>
            <Form.Control type='file' onChange={handleImageUploadPrep} />
          </Form.Group>

          {detailsAddImage && Object.keys(detailsAddImage).length > 0 && (
            <AlertMessage variant='info'>{detailsAddImage}</AlertMessage>
          )}

          {addImageLoading && <LoadingSpinner />}

          {errorAddImage && (
            <AlertMessage variant='danger'>{errorAddImage}</AlertMessage>
          )}

          {existingImage && !existingImage.includes("temp-image") && (
            <div className='movieDetail-imageJar'>
              <p>Current image:</p>
              <Image src={existingImage} />
            </div>
          )}

          {uploadImage !== "" && (
            <div className='movieDetail-imageJar mt-3'>
              <p>Image to upload:</p>
              <Image src={URL.createObjectURL(uploadImage)} />
            </div>
          )}

          <div className='my-3 d-flex justify-content-end'>
            <Button
              type='button'
              variant='primary'
              onClick={handleImageUpload}
              disabled={uploadImage === ""}
            >
              <i className='fas fa-pen-to-square'></i> &nbsp;Update Image
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
