import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

export default function LoadingSpinner({ height = "100px", width = "100px" }) {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        height: { height },
        width: { width },
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  );
}

LoadingSpinner.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};
