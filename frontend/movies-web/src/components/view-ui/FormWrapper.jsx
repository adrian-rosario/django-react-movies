import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
// import React from "react";

export default function FormWrapper({ children }) {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12}>{children}</Col>
      </Row>
    </Container>
  );
}

FormWrapper.propTypes = {
  children: PropTypes.node,
};
