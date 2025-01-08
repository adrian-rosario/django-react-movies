import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  adminListRatingsAction,
  adminDeleteRatingAction,
  listMoviesAction,
} from "../../state/actions/movie";
import { adminListUsersAction } from "../../state/actions/user";
import LoadingSpinner from "../view-ui/LoadingSpinner";
import AlertMessage from "../view-ui/AlertMessage";
import { Button, Table } from "react-bootstrap";
import { useState } from "react";
import { movie_constants as constants } from "../../util/constants_movie";
import Stars from "../view-ui/Stars";

export default function AdminListRatings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [ratingsLoaded, setRatingsLoaded] = useState(false);

  const userLoginState = useSelector((state) => state.userLogin);
  const { userDetails: loggedInUser, error: errorLoadingLoggedInUserDetails } =
    userLoginState;

  const ratingsListState = useSelector((state) => state.adminListRatings);
  const {
    ratings: allRatings,
    loading: loadingRatings,
    error: errorLoadingRatings,
  } = ratingsListState;

  const ratingsDeletedByAdminState = useSelector(
    (state) => state.adminDeleteRating
  );
  const {
    target: ratingDeleteTarget,
    loading: loadingDeleteRating,
    error: errorDeleteRating,
  } = ratingsDeletedByAdminState;

  const usersListState = useSelector((state) => state.adminListUsers);
  const {
    loading: loadingUsers,
    users: allUsers,
    error: erroLoadingUsers,
  } = usersListState;

  const movieList = useSelector((state) => state.movieList);
  const {
    allMovies,
    loading: loadingMovies,
    error: errorLoadingMovies,
  } = movieList;

  useEffect(() => {
    if (!loggedInUser || !loggedInUser.is_admin) {
      navigate("/login");
    } else {
      if (!ratingsLoaded) {
        dispatch(adminListRatingsAction());
        setRatingsLoaded(true);
      }

      if ((allUsers && allUsers.length < 1) || erroLoadingUsers) {
        dispatch(adminListUsersAction());
      }

      if (movieList && movieList.length < 1) {
        dispatch(listMoviesAction());
      }

      if (
        ratingDeleteTarget &&
        Object.keys(ratingDeleteTarget).length > 1 &&
        ratingDeleteTarget.includes("successfully")
      ) {
        setMessage(ratingDeleteTarget);
        // clear message after delay after informing user, then refresh data
        setTimeout(() => {
          setMessage("");
          dispatch({ type: constants.MOVIE_ADMIN_DELETE_RATING_RESET });
          dispatch(adminListRatingsAction());
        }, 1500);
      }
    }
  }, [
    allRatings,
    dispatch,
    errorLoadingLoggedInUserDetails,
    loggedInUser,
    navigate,
    ratingDeleteTarget,
    allUsers,
    movieList,
    ratingsLoaded,
    erroLoadingUsers,
  ]);

  const handleDelete = (id, user) => {
    setMessage("");
    if (
      window.confirm(
        `Are you sure you want to delete rating for: ${movieLookup(
          id
        )} - by user: ${userLookup(user)}`
      )
    ) {
      dispatch(adminDeleteRatingAction(id));
      setRatingsLoaded(false);
    }
  };

  // to display the movie name, the data is only the movie id
  const movieLookup = (id) => {
    const the_movie = allMovies.find((obj) => obj.id === id);
    return the_movie.title;
  };

  const movieNumberOfRatingsLookup = (id) => {
    const the_movie = allMovies.find((obj) => obj.id === id);
    return the_movie.number_of_ratings;
  };

  const userLookup = (id) => {
    const the_user = allUsers.find((obj) => obj.id === id);
    return the_user.username;
  };

  return (
    <div className='mt-4'>
      <h3>Admin, all ratings</h3>

      {loadingRatings && <LoadingSpinner />}
      {errorLoadingRatings && (
        <AlertMessage variant='danger'>{errorLoadingRatings}</AlertMessage>
      )}

      {loadingDeleteRating && <LoadingSpinner />}
      {errorDeleteRating && (
        <AlertMessage variant='danger'>{errorDeleteRating}</AlertMessage>
      )}

      {loadingUsers && <LoadingSpinner />}
      {message && <AlertMessage variant='info'>{message}</AlertMessage>}

      {loadingMovies && <LoadingSpinner />}
      {errorLoadingMovies && (
        <AlertMessage variant='danger'>{errorLoadingMovies}</AlertMessage>
      )}

      <Table className='mt-3 ' striped bordered hover>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Username</th>
            <th className='text-center'>User Rating</th>
            <th>Comment</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {allRatings &&
            allRatings.length > 0 &&
            allRatings.map((item) => (
              <tr key={item.id}>
                <td>{movieLookup(item.movie)}</td>
                <td>{userLookup(item.user)}</td>
                <td className='text-center'>
                  <Stars
                    rating={item.rating}
                    reviews={movieNumberOfRatingsLookup(item.movie)}
                    star_color={"#43ac6a"}
                    toggle_display_text={false}
                  />
                </td>
                <td>{item.comment}</td>
                <td>
                  <Button
                    type='button'
                    variant='danger'
                    onClick={() => handleDelete(item.id, item.user)}
                    size='sm'
                  >
                    <i className='fas fa-circle-xmark'></i> &nbsp;Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {allRatings && !Array.isArray(allRatings) && (
        <AlertMessage variant='danger'>
          There is problem with the data returned.
        </AlertMessage>
      )}
      <hr />
    </div>
  );
}
