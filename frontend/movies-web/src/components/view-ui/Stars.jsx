import PropTypes from "prop-types";

export default function Stars({
  rating,
  reviews,
  star_color,
  toggle_display_text,
  center_text = false,
}) {
  return (
    <div>
      {rating > 0 && (
        <div className={center_text ? "centerText stars" : "stars"}>
          <span>
            <i
              style={{ color: star_color }}
              className={
                rating >= 1
                  ? "fas fa-star"
                  : rating >= 0.5
                  ? "fas fa-star-half-alt"
                  : "far fa star"
              }
            ></i>
          </span>

          <span>
            <i
              style={{ color: star_color }}
              className={
                rating >= 2
                  ? "fas fa-star"
                  : rating >= 1.5
                  ? "fas fa-star-half-alt"
                  : "far fa star"
              }
            ></i>
          </span>

          <span>
            <i
              style={{ color: star_color }}
              className={
                rating >= 3
                  ? "fas fa-star"
                  : rating >= 2.5
                  ? "fas fa-star-half-alt"
                  : "far fa star"
              }
            ></i>
          </span>

          <span>
            <i
              style={{ color: star_color }}
              className={
                rating >= 4
                  ? "fas fa-star"
                  : rating >= 3.5
                  ? "fas fa-star-half-alt"
                  : "far fa star"
              }
            ></i>
          </span>

          <span>
            <i
              style={{ color: star_color }}
              className={
                rating >= 5
                  ? "fas fa-star"
                  : rating >= 4.5
                  ? "fas fa-star-half-alt"
                  : "far fa star"
              }
            ></i>
          </span>
        </div>
      )}

      {rating > 0 && toggle_display_text && (
        <div>
          <small>
            {rating.toFixed(1)} from {reviews}
          </small>
        </div>
      )}

      {rating === 0 && (
        <>
          <div className={center_text ? "centerText stars" : "stars"}>
            <span>
              <i
                style={{ color: star_color }}
                className='fa-regular fa-star'
              ></i>
            </span>
            <span>
              <i
                style={{ color: star_color }}
                className='fa-regular fa-star'
              ></i>
            </span>
            <span>
              <i
                style={{ color: star_color }}
                className='fa-regular fa-star'
              ></i>
            </span>
            <span>
              <i
                style={{ color: star_color }}
                className='fa-regular fa-star'
              ></i>
            </span>
            <span>
              <i
                style={{ color: star_color }}
                className='fa-regular fa-star'
              ></i>
            </span>
          </div>
        </>
      )}
    </div>
  );
}

Stars.propTypes = {
  rating: PropTypes.number,
  reviews: PropTypes.number,
  star_color: PropTypes.string,
  toggle_display_text: PropTypes.bool,
  center_text: PropTypes.bool,
};
