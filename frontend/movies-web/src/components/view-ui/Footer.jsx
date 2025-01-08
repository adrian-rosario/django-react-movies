import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <div>
      <footer>
        <Container>
          <Row>
            <Col className='text-center py-3'>
              <small>&copy; Movie Ratings App</small>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
