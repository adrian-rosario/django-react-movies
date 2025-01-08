import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../view-ui/LoadingSpinner";
import AlertMessage from "../view-ui/AlertMessage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userListDetailsAction,
  updateUserProfileAction,
} from "../../state/actions/user";
import { Form, Button } from "react-bootstrap";
import { user_constants as constants } from "../../util/constants_user";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLoginState = useSelector((state) => state.userLogin);
  const {
    userDetails: loggedInUser,
    loading: loadingLoggedInUserDetails,
    error: errorLoadingLoggedInUserDetails,
  } = userLoginState;

  const userDetailsForEditingState = useSelector((state) => state.userDetails);
  const {
    user: userDetailsToEdit,
    loading: loadingUserDetailsToEdit,
    error: errorLoadingUserDetailsToEdit,
  } = userDetailsForEditingState;

  const userProfileUpdateState = useSelector(
    (state) => state.userProfileUpdate
  );
  const {
    loading: loadingProfileUpdateDetails,
    success: successProfileUpdateDetails,
  } = userProfileUpdateState;

  useEffect(() => {
    if (!loggedInUser || errorLoadingLoggedInUserDetails) {
      navigate("/login");
    } else {
      if (userDetailsToEdit && !userDetailsToEdit.id) {
        dispatch(userListDetailsAction());
      } else if (successProfileUpdateDetails) {
        dispatch({ type: constants.USER_UPDATE_PROFILE_RESET });
        dispatch(userListDetailsAction());
        setMessage("Profile updated.");
      } else {
        setName(userDetailsToEdit.name);
        setEmail(userDetailsToEdit.email);
      }
    }
  }, [
    errorLoadingLoggedInUserDetails,
    loggedInUser,
    navigate,
    dispatch,
    userDetailsToEdit,
    errorLoadingUserDetailsToEdit,
    successProfileUpdateDetails,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");

    if (password2 !== "") {
      if (password !== password2) {
        setMessage("Passwords don't match");
        return;
      }
    } else {
      const formObj = {
        name,
        email,
        password,
      };
      dispatch(updateUserProfileAction(formObj));
    }
  };

  // if there was a password mismatch warning, clear it
  const handlePasswordFocus = () => {
    setMessage("");
  };

  return (
    <>
      <div className='mt-4 w-75 mx-auto'>
        <h3>User Profile</h3>

        {loadingLoggedInUserDetails && <LoadingSpinner />}

        {errorLoadingLoggedInUserDetails && (
          <AlertMessage variant='danger'>
            {errorLoadingLoggedInUserDetails}
          </AlertMessage>
        )}

        {message && <AlertMessage variant='info'>{message}</AlertMessage>}

        {loadingUserDetailsToEdit && <LoadingSpinner />}

        {loadingProfileUpdateDetails && <LoadingSpinner />}

        <div>
          <Form onSubmit={handleSubmit}>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordFocus}
                autoComplete='new-password'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password2' className='my-3'>
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type='password'
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                onFocus={handlePasswordFocus}
                autoComplete='new-password'
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
              <i className='fas fa-pen-to-square'></i> &nbsp;Update Your Profile
            </Button>
          </Form>
        </div>
        <hr />
      </div>
    </>
  );
}
