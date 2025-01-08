import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
// import React from "react";

export default function AlertMessage({ variant, children }) {
  return (
    <Alert variant={variant} dismissible>
      {children}
    </Alert>
  );
}

AlertMessage.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};
