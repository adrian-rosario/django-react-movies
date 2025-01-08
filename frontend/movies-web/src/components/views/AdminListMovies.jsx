import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listMoviesAction } from "../../state/actions/movie";
import LoadingSpinner from "../view-ui/LoadingSpinner";
import AlertMessage from "../view-ui/AlertMessage";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Stars from "../view-ui/Stars";
import { adminDeleteMovieAction } from "../../state/actions/movie";
import { movie_constants as constants } from "../../util/constants_movie";
import { Image } from "react-bootstrap";

export default function AdminListMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const userLoginState = useSelector((state) => state.userLogin);
  const { userDetails: loggedInUser, error: errorLoadingLoggedInUserDetails } =
    userLoginState;

  const movieList = useSelector((state) => state.movieList);
  const { allMovies, loading, error } = movieList;

  const adminMovieDeleteState = useSelector((state) => state.adminDeleteMovie);
  const {
    target: movieDeleteTarget,
    loading: loadingMovieDelete,
    error: errorMovieDelete,
  } = adminMovieDeleteState;

  useEffect(() => {
    if (!loggedInUser || !loggedInUser.is_admin) {
      navigate("/login");
    } else {
      if (!allMovies.length > 0) {
        dispatch(listMoviesAction());
      }

      if (
        movieDeleteTarget &&
        Object.keys(movieDeleteTarget).length > 1 &&
        movieDeleteTarget.includes("successfully")
      ) {
        setMessage(movieDeleteTarget);
        // clear message after delay after informing user, then refresh data
        setTimeout(() => {
          setMessage("");
          dispatch({ type: constants.MOVIE_ADMIN_DELETE_RESET });
          dispatch(listMoviesAction());
        }, 1500);
      }
    }
  }, [
    allMovies,
    dispatch,
    loggedInUser,
    errorLoadingLoggedInUserDetails,
    navigate,
    movieDeleteTarget,
  ]);

  const handleDelete = (id, name) => {
    setMessage("");
    if (window.confirm(`Are you sure you want to delete Movie: ${name}`)) {
      dispatch(adminDeleteMovieAction(id));
    }
  };

  return (
    <div className='mt-4'>
      <h3>Admin: all movies</h3>

      {loading && <LoadingSpinner />}
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}

      {message && <AlertMessage variant='info'>{message}</AlertMessage>}

      {loadingMovieDelete && <LoadingSpinner />}
      {errorMovieDelete && (
        <AlertMessage variant='danger'>{errorMovieDelete}</AlertMessage>
      )}

      <Table className='mt-3 ' striped bordered hover>
        <thead>
          <tr>
            <th className='text-center align-middle'>Id</th>
            <th className='text-center align-middle'>Year</th>
            <th>Title</th>
            <th className='text-center align-middle'>Rating</th>
            <th className='text-center'>Image</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {allMovies &&
            allMovies.length > 0 &&
            Array.isArray(allMovies) &&
            allMovies.map((item) => (
              <tr key={item.id}>
                <td className='text-center'>{item.id}</td>
                <td className='text-center'>{item.year}</td>
                <td>{item.title}</td>
                <td className='text-center'>
                  <Stars
                    rating={item.ratings_average}
                    reviews={item.number_of_ratings}
                    star_color={"#43ac6a"}
                    toggle_display_text={false}
                  />
                </td>
                <td className='text-center'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    className='adminMoviesListImage'
                  />
                </td>
                <td>
                  <div className='d-flex justify-content-between mx-2'>
                    <Button
                      type='button'
                      variant='primary'
                      className='mx-1'
                      onClick={() => navigate(`/edit-movie/${item.id}`)}
                      size='sm'
                    >
                      <i className='fas fa-pen-to-square'></i> &nbsp;Edit Movie
                    </Button>

                    <Button
                      type='button'
                      variant='info'
                      className='mx-1'
                      onClick={() => navigate("/admin-ratings")}
                      size='sm'
                    >
                      <i className='fas fa-clipboard'></i> &nbsp;Manage Ratings
                    </Button>

                    <Button
                      type='button'
                      variant='danger'
                      className='mx-1'
                      onClick={() => handleDelete(item.id, item.title)}
                      size='sm'
                    >
                      <i className='fas fa-circle-xmark'></i> &nbsp;Delete Movie
                    </Button>
                  </div>{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <hr />
    </div>
  );
}
