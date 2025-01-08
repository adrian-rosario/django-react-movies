import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginAction } from "../../state/actions/user";
import FormWrapper from "../view-ui/FormWrapper";
import AlertMessage from "../view-ui/AlertMessage";
import LoadingSpinner from "../view-ui/LoadingSpinner";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(username, password));
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails, loading, error } = userLogin;

  useEffect(() => {
    if (userDetails && userDetails.id) {
      navigate("/");
    }
  }, [userDetails, navigate]);

  return (
    <div className='mt-4 w-75 mx-auto'>
      <FormWrapper>
        <h3>Login</h3>

        {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
        {loading && <LoadingSpinner />}

        <div className='mt-3'>
          <Form onSubmit={handleSubmit}>
            <div>
              <Form.Group controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Your email'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete='email'
                />
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete='current-password'
                />
              </Form.Group>

              <div className='mt-3'>
                <Button type='submit' variant='primary'>
                  Login
                </Button>
              </div>

              <Row className='mt-4'>
                <Col>
                  Not registered? &nbsp;
                  <Link to='/register'>Register</Link>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </FormWrapper>
    </div>
  );
}
