import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listMoviesAction,
  listRandomRatingAction,
} from "../../state/actions/movie";
import LoadingSpinner from "../view-ui/LoadingSpinner";
import AlertMessage from "../view-ui/AlertMessage";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Stars from "../view-ui/Stars";
import { Image } from "react-bootstrap";
import LinesEllipsis from "react-lines-ellipsis";

export default function Home() {
  const movieList = useSelector((state) => state.movieList);
  const { allMovies, loading, error } = movieList;

  const randomRatingState = useSelector((state) => state.movieListRandomRating);
  const {
    ratingDetails,
    loading: loadingRandomRating,
    error: errorRandomRating,
  } = randomRatingState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allMovies.length > 0) {
      dispatch(listMoviesAction());
      dispatch(listRandomRatingAction());
    }
  }, [allMovies, dispatch]);

  const handleClick = (id) => {
    navigate(`/movie-details/${id}`);
  };

  return (
    <>
      <div className='homepage'>
        {loading && <LoadingSpinner />}
        {error && <AlertMessage variant='danger'>{error}</AlertMessage>}

        {ratingDetails && ratingDetails.user && (
          <div className='card border-info mt-4 centerText pt-2'>
            <blockquote>
              <span className='pullQuote'>
                &quot;{ratingDetails.rating.comment}&quot;
              </span>
              <cite>
                &mdash; {ratingDetails.user}, &nbsp;
                <span className='boldText'>{ratingDetails.movie}</span>
                &nbsp;
              </cite>
              <Link to={`/movie-details/${ratingDetails.rating.movie}`}>
                <i className='fas fa-arrow-right' />
              </Link>
            </blockquote>
          </div>
        )}

        <div className='cards_jar mt-4 d-flex flex-wrap justify-content-between gap-2'>
          {loading && <LoadingSpinner />}
          {error && <AlertMessage variant='danger'>{error}</AlertMessage>}

          {allMovies &&
            allMovies.length > 0 &&
            Array.isArray(allMovies) &&
            allMovies.map((item) => (
              <div
                key={item.id}
                className='card border-info mb-3 homepageCard '
              >
                <div className='card-header'>
                  {item.title} : {item.year}
                </div>

                <div className='card-body'>
                  <h4 className='card-title'>
                    Director: <span className='boldText'>{item.director}</span>
                    <br />
                    DP: <span className='boldText'>{item.cinematographer}</span>
                  </h4>
                  <div className='card-text'>
                    <div>
                      <span className='boldText'>Starring:</span>&nbsp;
                      {item.starring}
                    </div>

                    {item.image !== "" && (
                      <div className='homeImages-jar'>
                        <Image src={item.image} alt={item.title} />

                        <Stars
                          rating={item.ratings_average}
                          reviews={item.number_of_ratings}
                          star_color={"#43ac6a"}
                          toggle_display_text={false}
                          center_text={true}
                        />

                        <div className='d-grid gap-2'>
                          <Button
                            type='button'
                            onClick={() => handleClick(item.id)}
                            syle={{ width: "100%" }}
                            size='sm'
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className='mt-1 plot-jar'>
                      <span className='boldText'>Plot:</span>&nbsp;
                      <LinesEllipsis
                        text={item.description}
                        maxLine='7'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                      />
                      <Button
                        type='button'
                        variant='link'
                        onClick={() => handleClick(item.id)}
                      >
                        Read more &nbsp;
                        <i className='fas fa-arrow-right' />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <hr />
      </div>
    </>
  );
}
