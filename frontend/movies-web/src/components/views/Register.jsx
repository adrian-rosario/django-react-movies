import { useEffect, useState } from "react";
import FormWrapper from "../view-ui/FormWrapper";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userRegistrationAction } from "../../state/actions/user";
import AlertMessage from "../view-ui/AlertMessage";
import LoadingSpinner from "../view-ui/LoadingSpinner";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user register state
  const userRegistrationState = useSelector((state) => state.userRegister);
  const { userRegistration, loading, error } = userRegistrationState;

  // useeffect, if userdetails, navigate...
  useEffect(() => {
    if (userRegistration) {
      navigate("/");
    }
  }, [userRegistration, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message !== "") {
      setMessage("");
    }

    if (password !== password2) {
      setMessage("Passwords must be identical");
    } else {
      dispatch(userRegistrationAction(name, email, password));
    }
  };
  return (
    <div className='mt-4  w-75 mx-auto'>
      <FormWrapper>
        <h3>Register</h3>

        {message && <AlertMessage variant='danger'>{message}</AlertMessage>}
        {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
        {loading && <LoadingSpinner />}

        <div className='mt-3'>
          <Form onSubmit={handleSubmit}>
            <div>
              <Form.Group controlId='email' className='my-3 mt-4'>
                <Form.Label>Email Address:</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='name' className='my-3 mt-4'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password2' className='my-3'>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirmn Your password'
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary' className='mt-3'>
                Register
              </Button>
            </div>
          </Form>

          <Row className='py-3'>
            <Col>
              Already registered? &nbsp;<Link to='/login'>Login</Link>
            </Col>
          </Row>
        </div>
      </FormWrapper>
    </div>
  );
}
