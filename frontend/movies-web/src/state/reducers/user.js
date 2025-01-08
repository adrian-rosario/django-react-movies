import { user_constants as constants } from "../../util/constants_user";

export const userDetails = (state = { user: {} }, action) => {
  switch (action.type) {
    case constants.USER_DETAIL:
      return { ...state, loading: true };

    case constants.USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload };

    case constants.USER_DETAIL_FAILED:
      return { loading: false, error: action.payload };

    case constants.USER_RESET:
      return { user: {} };

    default:
      return state;
  }
};

export const userLogin = (state = {}, action) => {
  switch (action.type) {
    case constants.USER_LOGIN:
      return { loading: true };

    case constants.USER_LOGIN_SUCCESS:
      return { loading: false, userDetails: action.payload };

    case constants.USER_LOGIN_FAILED:
      return { loading: false, error: action.payload };

    case constants.USER_LOGOUT:
      return { userDetails: {} };

    default:
      return state;
  }
};

export const userRegister = (state = {}, action) => {
  switch (action.type) {
    case constants.USER_REGISTER:
      return { loading: true };

    case constants.USER_REGISTER_SUCCESS:
      return { loading: false, userRegistration: action.payload };

    case constants.USER_REGISTER_FAILED:
      return { loading: false, error: action.payload };

    case constants.USER_REGISTER_RESET:
      return { userRegistration: {} };
    default:
      return state;
  }
};

export const userProfileUpdate = (state = { userDetails: {} }, action) => {
  switch (action.type) {
    case constants.USER_UPDATE_PROFILE:
      return { loading: true };

    case constants.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userDetails: action.payload };

    case constants.USER_UPDATE_PROFILE_FAILED:
      return { loading: false, error: action.payload };

    case constants.USER_UPDATE_PROFILE_RESET:
      return { userDetails: {} };

    default:
      return state;
  }
};

export const adminListUsers = (state = { users: [] }, action) => {
  switch (action.type) {
    case constants.USER_ADMIN_LIST_USERS:
      return { loading: true };
    case constants.USER_ADMIN_LIST_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case constants.USER_ADMIN_LIST_USERS_FAILED:
      return { loading: false, error: action.payload };
    case constants.USER_ADMIN_LIST_USERS_RESET:
      return { users: {} };
    default:
      return state;
  }
};

export const adminListUserDetails = (state = { details: {} }, action) => {
  switch (action.type) {
    case constants.USER_ADMIN_USER_DETAIL:
      return { loading: true };
    case constants.USER_ADMIN_USER_DETAIL_SUCCESS:
      return { loading: false, details: action.payload };
    case constants.USER_ADMIN_USER_DETAIL_FAILED:
      return { loading: false, error: action.payload };
    case constants.USER_ADMIN_USER_DETAIL_RESET:
      return { details: {} };
    default:
      return state;
  }
};

export const adminUpdateUser = (state = { details: {} }, action) => {
  switch (action.type) {
    case constants.USER_ADMIN_UPDATE_PROFILE:
      return { loading: true };
    case constants.USER_ADMIN_UPDATE_PROFILE_SUCCESS:
      return { loading: false, details: action.payload };
    case constants.USER_ADMIN_UPDATE_PROFILE_FAILED:
      return { loading: false, error: action.payload };
    case constants.USER_ADMIN_UPDATE_PROFILE_RESET:
      return { details: {} };
    default:
      return state;
  }
};

export const adminDeleteUser = (state = {}, action) => {
  switch (action.type) {
    case constants.USER_ADMIN_DELETE_USER:
      return { loading: true };
    case constants.USER_ADMIN_DELETE_USER_SUCCESS:
      return { loading: false, details: action.payload };
    case constants.USER_ADMIN_DELETE_USER_FAILED:
      return { loading: false, error: action.payload };
    case constants.USER_ADMIN_DELETE_USER_RESET:
      return { details: {} };
    default:
      return state;
  }
};
