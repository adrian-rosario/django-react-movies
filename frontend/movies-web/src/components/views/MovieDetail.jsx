import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  movieDetailAction,
  listReviewsForMovieAction,
  listMoviesAction,
} from "../../state/actions/movie";
import Stars from "../view-ui/Stars";
import LoadingSpinner from "../view-ui/LoadingSpinner";
import AlertMessage from "../view-ui/AlertMessage";
import RatingForm from "../view-ui/RatingForm";
import { movie_constants as constants } from "../../util/constants_movie";
import { Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function MovieDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  const movieDetailsState = useSelector((state) => state.movieDetail);
  const { movie, error, loading } = movieDetailsState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails /* , loading, error */ } = userLogin;

  const userReviewState = useSelector((state) => state.movieRatingPost);
  const { reset } = userReviewState;

  const movieRatingsState = useSelector((state) => state.movieRatingsForMovie);
  const {
    ratings,
    loading: loadingRatings,
    error: errorLoadingRatings,
  } = movieRatingsState;

  // get user state
  const userLoginState = useSelector((state) => state.userLogin);
  const { userDetails: loggedInUser } = userLoginState;

  useEffect(() => {
    let pathMatchesData;
    if (movie && movie.id) {
      pathMatchesData = parseInt(movie.id) === parseInt(id);
    }

    // refresh data, previous movie data is in the store
    if (!pathMatchesData) {
      dispatch({ type: constants.MOVIE_DETAIL_RESET });
      dispatch(movieDetailAction(id));
    }

    // if a new rating has been posted, we need fresh movie data
    if (reset) {
      dispatch(movieDetailAction(id));
      dispatch(listMoviesAction());
      dispatch({ type: constants.MOVIE_REVIEW_POST_RESET_CLEAR });
    }

    if (!reviewsLoaded) {
      dispatch(listReviewsForMovieAction(id));
      setReviewsLoaded(true);
      // reload all
      dispatch({ type: constants.MOVIE_REVIEW_POST_RESET_CLEAR });
    }
  }, [dispatch, movie, id, reset, ratings, reviewsLoaded, error]);
  return (
    <div className='mt-4'>
      <h3>Film Details</h3>

      {loading && <LoadingSpinner />}
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}

      {movie && (
        <Row>
          <Col>
            <h4 className='mt-1'>
              {movie.title}, {movie.year}
            </h4>

            {loadingRatings && <LoadingSpinner height='16px' width='16px' />}
            {errorLoadingRatings && (
              <AlertMessage variant='danger'>
                {errorLoadingRatings}
              </AlertMessage>
            )}

            <Stars
              rating={movie.ratings_average}
              reviews={movie.number_of_ratings}
              star_color={"#43ac6a"}
              toggle_display_text={true}
            />

            <p className='mt-2'>
              <span className='boldText'>Director:</span>&nbsp;
              {movie.director}
            </p>

            <p>
              <span className='boldText'>Cinematographer:</span>&nbsp;
              {movie.cinematographer}
            </p>

            <p>
              <span className='boldText'>Starring:</span>&nbsp;
              {movie.starring}
            </p>

            <p>{movie.description}</p>

            {loggedInUser && loggedInUser.id && (
              <Button
                type='button'
                className='mb-2'
                onClick={() => navigate(`/edit-movie/${id}`)}
              >
                Edit Movie.
              </Button>
            )}

            {userDetails && userDetails.id && <RatingForm />}
          </Col>
          <Col>
            <div className='movieDetailPageImage-jar'>
              <Image src={movie.image} alt={movie.title} />
            </div>
          </Col>
        </Row>
      )}
      <hr />
    </div>
  );
}
