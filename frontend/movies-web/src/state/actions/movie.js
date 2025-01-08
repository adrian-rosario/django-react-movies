import { movie_constants as constants } from "../../util/constants_movie";
import axios from "axios";

export const listMoviesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: constants.MOVIE_LIST,
    });

    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/movies/", {}, configuration);

    dispatch({ type: constants.MOVIE_LIST_SUCCESS, payload: data });
    //
  } catch (error) {
    dispatch({
      type: constants.MOVIE_LIST_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const movieDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: constants.MOVIE_DETAIL,
    });

    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/movie/${id}`, {}, configuration);

    dispatch({ type: constants.MOVIE_DETAIL_SUCCESS, payload: data });
    //
  } catch (error) {
    dispatch({
      type: constants.MOVIE_DETAIL_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const postUserReviewAction =
  (id, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.MOVIE_REVIEW_POST,
      });

      const {
        userLogin: { userDetails },
      } = getState();

      const configuration = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/new-rating/${id}`,
        review,
        configuration
      );

      dispatch({ type: constants.MOVIE_REVIEW_POST_SUCCESS, payload: data });
      //
    } catch (error) {
      dispatch({
        type: constants.MOVIE_REVIEW_POST_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listReviewsForMovieAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: constants.MOVIE_RATINGS_FOR_MOVIE,
    });

    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/ratings/for-movie/${id}`,
      {},
      configuration
    );

    dispatch({
      type: constants.MOVIE_RATINGS_FOR_MOVIE_SUCCESS,
      payload: data,
    });
    //
  } catch (error) {
    dispatch({
      type: constants.MOVIE_RATINGS_FOR_MOVIE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addNewMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.MOVIE_ADD_MOVIE,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.post(
      `api/movies/new-movie/`,
      movie,
      configuration
    );

    dispatch({ type: constants.MOVIE_ADD_MOVIE_SUCCESS, payload: data });
    //
  } catch (error) {
    dispatch({
      type: constants.MOVIE_ADD_MOVIE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addMovieImageAction =
  (newImageObj) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.MOVIE_ADD_IMAGE,
      });

      const {
        userLogin: { userDetails },
      } = getState();

      const configuration = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/image/",
        newImageObj,
        configuration
      );

      dispatch({ type: constants.MOVIE_ADD_IMAGE_SUCCESS, payload: data });
      //
    } catch (error) {
      dispatch({
        type: constants.MOVIE_ADD_IMAGE_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.MOVIE_POST_UPDATE,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.put(`/api/edit/${id}`, movie, configuration);

    dispatch({ type: constants.MOVIE_POST_UPDATE_SUCCESS, payload: data });
    //
  } catch (error) {
    dispatch({
      type: constants.MOVIE_POST_UPDATE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminListRatingsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.MOVIE_ADMIN_LIST_RATINGS });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(`/api/ratings/`, configuration);

    dispatch({
      type: constants.MOVIE_ADMIN_LIST_RATINGS_SUCCESS,
      payload: data,
    });
    //
  } catch (error) {
    dispatch({
      type: constants.MOVIE_ADMIN_LIST_RATINGS_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminDeleteRatingAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.MOVIE_ADMIN_DELETE_RATING,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/rating/delete/${id}`,
      configuration
    );

    dispatch({
      type: constants.MOVIE_ADMIN_DELETE_RATING_SUCCESS,
      payload: data,
    });
    //
  } catch (error) {
    dispatch({
      type: constants.MOVIE_ADMIN_DELETE_RATING_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminDeleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.MOVIE_ADMIN_DELETE,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/movies/delete/${id}`,
      configuration
    );

    dispatch({
      type: constants.MOVIE_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    //
  } catch (error) {
    dispatch({
      type: constants.MOVIE_ADMIN_DELETE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listRandomRatingAction = () => async (dispatch) => {
  try {
    dispatch({
      type: constants.MOVIE_LIST_RANDOM_RATING,
    });

    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/rating/random/", configuration);

    dispatch({
      type: constants.MOVIE_LIST_RANDOM_RATING_SUCCESS,
      payload: data,
    });
    //
  } catch (error) {
    dispatch({
      type: constants.MOVIE_LIST_RANDOM_RATING_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
