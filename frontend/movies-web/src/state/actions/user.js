import { user_constants as constants } from "../../util/constants_user";
import axios from "axios";
import { movie_constants } from "../../util/constants_movie";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: constants.USER_LOGIN,
    });

    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/user/token/",
      {
        username: email,
        password: password,
      },
      configuration
    );

    dispatch({
      type: constants.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: constants.USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userLogoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  // state cleanup
  dispatch({ type: constants.USER_LOGOUT });
  dispatch({ type: constants.USER_RESET });
  dispatch({ type: movie_constants.MOVIE_RATINGS_FOR_MOVIE_RESET });
  dispatch({ type: movie_constants.MOVIE_DETAIL_RESET });
  dispatch({ type: movie_constants.MOVIE_ADMIN_LIST_RATINGS_RESET });
  dispatch({ type: constants.USER_ADMIN_USER_DETAIL_RESET });
  dispatch({ type: constants.USER_ADMIN_LIST_USERS_RESET });
};

export const userRegistrationAction =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: constants.USER_REGISTER });

      const configuration = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/user/new/",
        {
          name,
          email,
          password,
        },
        configuration
      );

      dispatch({
        type: constants.USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: constants.USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: constants.USER_REGISTER_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const userListDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.USER_DETAIL });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(`/user/profile/`, configuration);

    dispatch({ type: constants.USER_DETAIL_SUCCESS, payload: data });
    //
  } catch (error) {
    dispatch({
      type: constants.USER_DETAIL_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUserProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.USER_UPDATE_PROFILE });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.put(`/user/update/`, user, configuration);

    dispatch({
      type: constants.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: constants.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    //
  } catch (error) {
    dispatch({
      type: constants.USER_UPDATE_PROFILE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminListUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.USER_ADMIN_LIST_USERS });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(`/user/users/`, configuration);

    dispatch({
      type: constants.USER_ADMIN_LIST_USERS_SUCCESS,
      payload: data,
    });
    //
  } catch (error) {
    dispatch({
      type: constants.USER_ADMIN_LIST_USERS_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminListUserDetailsAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: constants.USER_ADMIN_USER_DETAIL });

      const {
        userLogin: { userDetails },
      } = getState();

      const configuration = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const { data } = await axios.get(`/user/${id}`, configuration);

      dispatch({
        type: constants.USER_ADMIN_USER_DETAIL_SUCCESS,
        payload: data,
      });
      //
    } catch (error) {
      dispatch({
        type: constants.USER_ADMIN_USER_DETAIL_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminUpdateUserAction =
  (id, user) => async (dispatch, getState) => {
    try {
      dispatch({ type: constants.USER_ADMIN_UPDATE_PROFILE });

      const {
        userLogin: { userDetails },
      } = getState();

      const configuration = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const { data } = await axios.put(
        `/user/admin/update-user/${id}`,
        user,
        configuration
      );

      dispatch({
        type: constants.USER_ADMIN_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
      //
    } catch (error) {
      dispatch({
        type: constants.USER_ADMIN_UPDATE_PROFILE_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminDeleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.USER_ADMIN_DELETE_USER });

    const {
      userLogin: { userDetails },
    } = getState();

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.delete(`/user/delete/${id}`, configuration);

    dispatch({
      type: constants.USER_ADMIN_DELETE_USER_SUCCESS,
      payload: data,
    });
    //
  } catch (error) {
    dispatch({
      type: constants.USER_ADMIN_DELETE_USER_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
