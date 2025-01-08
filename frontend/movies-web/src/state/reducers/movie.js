import { movie_constants as constants } from "../../util/constants_movie";

export const movieList = (state = { allMovies: [] }, action) => {
  switch (action.type) {
    case constants.MOVIE_LIST:
      return { ...state, loading: true };

    case constants.MOVIE_LIST_SUCCESS:
      return { loading: false, allMovies: action.payload };

    case constants.MOVIE_LIST_FAILED:
      return { loading: false, error: action.payload };

    case constants.MOVIE_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const movieDetail = (state = { movie: {} }, action) => {
  switch (action.type) {
    case constants.MOVIE_DETAIL:
      return { loading: true };
    case constants.MOVIE_DETAIL_SUCCESS:
      return { loading: false, movie: action.payload };
    case constants.MOVIE_DETAIL_FAILED:
      return { loading: false, error: action.payload };
    case constants.MOVIE_DETAIL_RESET:
      return { movie: {} };
    default:
      return state;
  }
};

export const movieRatingPost = (state = { review: {} }, action) => {
  switch (action.type) {
    case constants.MOVIE_REVIEW_POST:
      return { loading: true };
    case constants.MOVIE_REVIEW_POST_SUCCESS:
      return { loading: false, review: action.payload };
    case constants.MOVIE_REVIEW_POST_FAILED:
      return { loading: false, error: action.payload };
    case constants.MOVIE_REVIEW_POST_RESET:
      return { loading: false, review: {}, reset: true };
    case constants.MOVIE_REVIEW_POST_RESET_CLEAR:
      return { loading: false, review: {}, reset: false };
    default:
      return state;
  }
};

export const movieRatingsForMovie = (state = { ratings: [] }, action) => {
  switch (action.type) {
    case constants.MOVIE_RATINGS_FOR_MOVIE:
      return { loading: true };
    case constants.MOVIE_RATINGS_FOR_MOVIE_SUCCESS:
      return { loading: false, ratings: action.payload };
    case constants.MOVIE_RATINGS_FOR_MOVIE_FAILED:
      return { loading: false, error: action.payload };
    case constants.MOVIE_RATINGS_FOR_MOVIE_RESET:
      return { loading: false, ratings: [] };
    default:
      return state;
  }
};

export const movieNew = (state = { details: {} }, action) => {
  switch (action.type) {
    case constants.MOVIE_ADD_MOVIE:
      return { loading: true };
    case constants.MOVIE_ADD_MOVIE_SUCCESS:
      return { loading: false, details: action.payload };
    case constants.MOVIE_ADD_MOVIE_FAILED:
      return { loading: false, error: action.payload };
    case constants.MOVIE_ADD_MOVIE_RESET:
      return { details: {} };
    default:
      return state;
  }
};

export const movieImagePost = (state = { details: {} }, action) => {
  switch (action.type) {
    case constants.MOVIE_ADD_IMAGE:
      return { loading: true };
    case constants.MOVIE_ADD_IMAGE_SUCCESS:
      return { loading: false, details: action.payload };
    case constants.MOVIE_ADD_IMAGE_FAILED:
      return { loading: false, error: action.payload };
    case constants.MOVIE_ADD_IMAGE_RESET:
      return { details: {} };
    default:
      return state;
  }
};

export const movieUpdatePost = (state = { details: {} }, action) => {
  switch (action.type) {
    case constants.MOVIE_POST_UPDATE:
      return { loading: true };
    case constants.MOVIE_POST_UPDATE_SUCCESS:
      return { loading: false, details: action.payload };
    case constants.MOVIE_POST_UPDATE_FAILED:
      return { loading: false, error: action.payload };
    case constants.MOVIE_POST_UPDATE_RESET:
      return { details: {} };
    default:
      return state;
  }
};

export const adminListRatings = (state = { ratings: [] }, action) => {
  switch (action.type) {
    case constants.MOVIE_ADMIN_LIST_RATINGS:
      return { loading: true };
    case constants.MOVIE_ADMIN_LIST_RATINGS_SUCCESS:
      return { loading: false, ratings: action.payload };
    case constants.MOVIE_ADMIN_LIST_RATINGS_FAILED:
      return { loading: false, error: action.payload };
    case constants.MOVIE_ADMIN_LIST_RATINGS_RESET:
      return { ratings: [] };
    default:
      return state;
  }
};

export const adminDeleteRating = (state = { target: {} }, action) => {
  switch (action.type) {
    case constants.MOVIE_ADMIN_DELETE_RATING:
      return { loading: true };
    case constants.MOVIE_ADMIN_DELETE_RATING_SUCCESS:
      return { loading: false, target: action.payload };
    case constants.MOVIE_ADMIN_DELETE_RATING_FAILED:
      return { loading: false, error: action.payload };
    case constants.MOVIE_ADMIN_DELETE_RATING_RESET:
      return { target: {} };
    default:
      return state;
  }
};

export const adminDeleteMovie = (state = { target: {} }, action) => {
  switch (action.type) {
    case constants.MOVIE_ADMIN_DELETE:
      return { loading: true };
    case constants.MOVIE_ADMIN_DELETE_SUCCESS:
      return { loading: false, target: action.payload };
    case constants.MOVIE_ADMIN_DELETE_FAILED:
      return { loading: false, error: action.payload };
    case constants.MOVIE_ADMIN_DELETE_RESET:
      return { target: {} };
    default:
      return state;
  }
};

export const movieListRandomRating = (
  state = { ratingDetails: {} },
  action
) => {
  switch (action.type) {
    case constants.MOVIE_LIST_RANDOM_RATING:
      return { loading: true };
    case constants.MOVIE_LIST_RANDOM_RATING_SUCCESS:
      return { loading: false, ratingDetails: action.payload };
    case constants.MOVIE_LIST_RANDOM_RATING_FAILED:
      return { loading: false, error: action.payload };
    case constants.MOVIE_LIST_RANDOM_RATING_RESET:
      return { ratingDetails: {} };
    default:
      return state;
  }
};
