import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { addNewMovieAction, listMoviesAction } from "../../state/actions/movie";
import AlertMessage from "../view-ui/AlertMessage";
import LoadingSpinner from "../view-ui/LoadingSpinner";
import { movie_constants as constants } from "../../util/constants_movie";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    /* loading: loadingLoggedInUserDetails, */
    error: errorLoadingLoggedInUserDetails,
  } = userLoginState;

  const newMovieState = useSelector((state) => state.movieNew);
  const {
    loading: loadingNewMovie,
    details: newMoveiDetails,
    error: errorNewMovie,
  } = newMovieState;

  useEffect(() => {
    if (!loggedInUser || errorLoadingLoggedInUserDetails) {
      navigate("/login");
    }

    if (newMoveiDetails && newMoveiDetails.id) {
      dispatch(listMoviesAction());
      dispatch({ type: constants.MOVIE_ADD_MOVIE_RESET });
      navigate("/");
    }
  }, [
    loggedInUser,
    errorLoadingLoggedInUserDetails,
    navigate,
    newMoveiDetails,
    dispatch,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewMovieAction({
        title,
        description,
        year,
        director,
        starring,
        cinematographer,
      })
    );

    setTitle("");
    setDescription("");
    setYear("");
    setDirector("");
    setStarring("");
    setCinematographer("");
  };

  return (
    <div className='mt-4 w-75 mx-auto'>
      <h3>Add Movie</h3>

      {errorNewMovie && (
        <AlertMessage variant='danger'>{errorNewMovie}</AlertMessage>
      )}
      {loadingNewMovie && <LoadingSpinner />}

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
                required
              />
            </Form.Group>

            <Form.Group controlId='year' className='my-3 mt-4'>
              <Form.Label>Year:</Form.Label>
              <Form.Control
                type='text'
                placeholder='1888'
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='director' className='my-3 mt-4'>
              <Form.Label>Director:</Form.Label>
              <Form.Control
                type='text'
                placeholder='100 characters max'
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='starring' className='my-3 mt-4'>
              <Form.Label>Starring:</Form.Label>
              <Form.Control
                type='text'
                placeholder='100 characters max'
                value={starring}
                onChange={(e) => setStarring(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='cinematographer' className='my-3 mt-4'>
              <Form.Label>Cinematographer:</Form.Label>
              <Form.Control
                type='text'
                placeholder='100 characters max'
                value={cinematographer}
                onChange={(e) => setCinematographer(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='description' className='my-3 mt-4'>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type='text'
                as='textarea'
                rows={3}
                placeholder='400 characters max'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              <i className='fas fa-pen-to-square'></i> &nbsp;Add New Movie
            </Button>
          </Form>
        </Col>
      </Row>
      <hr />
    </div>
  );
}
