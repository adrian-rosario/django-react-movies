import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminListUserDetailsAction } from "../../state/actions/user";
import AlertMessage from "../view-ui/AlertMessage";
import LoadingSpinner from "../view-ui/LoadingSpinner";
import { Form, Button } from "react-bootstrap";
import {
  adminUpdateUserAction,
  adminListUsersAction,
} from "../../state/actions/user";
import { user_constants as constants } from "../../util/constants_user";

export default function AdminEditUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [message, setMessage] = useState("");

  const userLoginState = useSelector((state) => state.userLogin);
  const { userDetails: loggedInUser, error: errorLoadingLoggedInUserDetails } =
    userLoginState;

  const adminListUserDetailsState = useSelector(
    (state) => state.adminListUserDetails
  );
  const {
    details: userDetails,
    error: errorLoadingUserDetails,
    loading: loadingUserDetails,
  } = adminListUserDetailsState;

  const userUpdateState = useSelector((state) => state.adminUpdateUser);
  const {
    loading: loadingUpdatedUser,
    details: detailsUpdatedUser,
    error: errorUpdatedUser,
  } = userUpdateState;

  useEffect(() => {
    if (!loggedInUser || !loggedInUser.is_admin) {
      navigate("/login");
    } else {
      if (userDetails && !userDetails.id) {
        dispatch(adminListUserDetailsAction(id));
      }

      if (userDetails && parseInt(userDetails.id) !== parseInt(id)) {
        dispatch(adminListUserDetailsAction(id));
      }

      if (detailsUpdatedUser && detailsUpdatedUser.id) {
        setMessage("User updated successfully.");
        // delay so the success message will display for a moment before refreshing data
        setTimeout(() => {
          dispatch({ type: constants.USER_ADMIN_UPDATE_PROFILE_RESET });
          dispatch(adminListUserDetailsAction(id));
          dispatch(adminListUsersAction());
          setMessage("");
        }, 1500);
      }

      if (userDetails && userDetails.id) {
        setEmail(userDetails.email);
        setIsAdmin(userDetails.is_admin);
        setName(userDetails.name);
      }
    }
  }, [
    dispatch,
    loggedInUser,
    errorLoadingLoggedInUserDetails,
    navigate,
    userDetails,
    id,
    detailsUpdatedUser,
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
        is_admin: isAdmin,
        password,
      };
      dispatch(adminUpdateUserAction(id, formObj));
    }
  };

  // if there was a password mismatch warning, clear it
  const handlePasswordFocus = () => {
    setMessage("");
  };

  return (
    <div className='mt-4 w-75 mx-auto'>
      <h3>Admin, edit user</h3>

      <div>
        <Link to='/admin-users'>Back to All Users</Link>
      </div>

      {errorLoadingUserDetails && (
        <AlertMessage variant='danger'>{errorLoadingUserDetails}</AlertMessage>
      )}

      {loadingUserDetails && <LoadingSpinner />}

      {message && <AlertMessage variant='info'>{message}</AlertMessage>}

      {errorUpdatedUser && (
        <AlertMessage variant='danger'>{errorUpdatedUser}</AlertMessage>
      )}

      {loadingUpdatedUser && <LoadingSpinner />}

      {userDetails && userDetails.id && (
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='email' className='my-3 mt-4'>
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type='email'
                placeholder='User email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete='email'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='name' className='my-3 mt-4'>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='User first name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='is_admin' className='my-3 mt-4'>
              <Form.Label>Is Admin:</Form.Label>
              <Form.Check
                type='checkbox'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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
              <i className='fas fa-pen-to-square'></i> &nbsp;Update User Profile
            </Button>
          </Form>
        </div>
      )}
      <hr />
    </div>
  );
}
