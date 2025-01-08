import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { listMoviesAction } from "../../state/actions/movie";
import LoadingSpinner from "../view-ui/LoadingSpinner";
import AlertMessage from "../view-ui/AlertMessage";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Mission() {
  const [articleId, setArticleId] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [articleImageAlt, setArticleImageAlt] = useState("");
  const [artileImageYear, setArticleImageYear] = useState("");
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);
  const { allMovies, loading, error } = movieList;

  useEffect(() => {
    if (!allMovies.length > 0) {
      dispatch(listMoviesAction());
    }

    if (allMovies.length > 0) {
      // pick an image
      const randomMovieNumber = Math.floor(Math.random() * allMovies.length);
      setArticleId(allMovies[randomMovieNumber].id);
      setArticleImage(allMovies[randomMovieNumber].image);
      setArticleImageAlt(allMovies[randomMovieNumber].title);
      setArticleImageYear(allMovies[randomMovieNumber].year);
    }
  }, [allMovies, dispatch]);

  return (
    <div className='mt-4'>
      <h3>Mission</h3>

      {loading && <LoadingSpinner />}
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}

      {articleImage && (
        <div className='missionPageImage-jar'>
          <Image src={articleImage} alt={articleImageAlt} />
          <br />
          <small>
            {articleImageAlt} - {artileImageYear}
            &nbsp;
            <Link to={`/movie-details/${articleId}`}>
              <i className='fas fa-arrow-right' />
            </Link>
          </small>
        </div>
      )}

      <p className='largeFirstLetter'>This website ...</p>

      <p>For film ...</p>

      <p>By combining ...</p>
      <hr />
    </div>
  );
}
