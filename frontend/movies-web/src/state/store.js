import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  userDetails,
  userLogin,
  userRegister,
  userProfileUpdate,
  adminListUsers,
  adminListUserDetails,
  adminUpdateUser,
  adminDeleteUser,
} from "./reducers/user";
import {
  movieList,
  movieDetail,
  movieRatingPost,
  movieRatingsForMovie,
  movieNew,
  movieImagePost,
  movieUpdatePost,
  movieListRandomRating,
  adminListRatings,
  adminDeleteRating,
  adminDeleteMovie,
} from "./reducers/movie";

const reducer = combineReducers({
  userDetails,
  userLogin,
  userRegister,
  userProfileUpdate,
  adminListUsers,
  adminListUserDetails,
  adminUpdateUser,
  adminListRatings,
  adminDeleteRating,
  adminDeleteMovie,
  adminDeleteUser,
  movieList,
  movieDetail,
  movieRatingPost,
  movieRatingsForMovie,
  movieNew,
  movieImagePost,
  movieUpdatePost,
  movieListRandomRating,
});

const user_from_local_storage = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

const initialState = {
  userLogin: { userDetails: user_from_local_storage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
