import { useEffect, useState } from "react";
import FormWrapper from "./FormWrapper";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import AlertMessage from "./AlertMessage";
import { postUserReviewAction } from "../../state/actions/movie";
import { movie_constants as constants } from "../../util/constants_movie";

export default function RatingForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const userReviewState = useSelector((state) => state.movieRatingPost);
  const { loading, review, error } = userReviewState;

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    dispatch(postUserReviewAction(id, { rating, comment }));
  };

  useEffect(() => {
    // if there is an error, only show it briefly
    if (error) {
      setTimeout(() => {
        dispatch({ type: constants.MOVIE_REVIEW_POST_RESET });
      }, 1500);
    }

    if (review && review.id) {
      setMessage("Review posted.");
      setTimeout(() => {
        dispatch({ type: constants.MOVIE_REVIEW_POST_RESET });
        setMessage("");
      }, 1500);
    }
  }, [error, dispatch, review]);

  return (
    <div className='mt-4'>
      {loading && <LoadingSpinner />}
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}

      {message && <AlertMessage variant='info'>{message}</AlertMessage>}

      <FormWrapper>
        <div className='card bg-secondary mb-3'>
          <div className='card-header'>Add a Review</div>
          <div className='card-body'>
            <h4 className='card-title'>One user review per film</h4>

            <div className='mt-3'>
              <Form onSubmit={handleSubmit}>
                <div>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      value={rating}
                      aria-label='Select your movie rating'
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value='1'>1 - Very Poor</option>
                      <option value='2'>2 - Not So Good</option>
                      <option value='3'>3 - Average</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Form.Group>

                  <Button type='submit' className='mt-3'>
                    Post Your Review
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
