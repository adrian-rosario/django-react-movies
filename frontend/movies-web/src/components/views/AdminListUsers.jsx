import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminListUsersAction } from "../../state/actions/user";
import { useEffect } from "react";
import AlertMessage from "../view-ui/AlertMessage";
import LoadingSpinner from "../view-ui/LoadingSpinner";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { adminDeleteUserAction } from "../../state/actions/user";
import { useState } from "react";
import { user_constants as constants } from "../../util/constants_user";

export default function AdminListUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  // const [message, setMessage] = useState("");

  const userLoginState = useSelector((state) => state.userLogin);
  const { userDetails: loggedInUser, error: errorLoadingLoggedInUserDetails } =
    userLoginState;

  const usersListState = useSelector((state) => state.adminListUsers);
  const { loading, users, error } = usersListState;

  const adminUserDeleteState = useSelector((state) => state.adminDeleteUser);
  const {
    loading: loadingDelete,
    details: userDeleteDetails,
    error: errorDelete,
  } = adminUserDeleteState;

  useEffect(() => {
    if (!loggedInUser || !loggedInUser.is_admin) {
      navigate("/login");
    } else {
      if (users && users.length < 1) {
        dispatch(adminListUsersAction());
      }

      if (userDeleteDetails && userDeleteDetails === "User deleted.") {
        setMessage(userDeleteDetails);
        setTimeout(() => {
          dispatch({ type: constants.USER_ADMIN_DELETE_USER_RESET });
          setMessage("");
          dispatch(adminListUsersAction());
        }, 1500);
      }
    }
  }, [
    dispatch,
    users,
    loggedInUser,
    errorLoadingLoggedInUserDetails,
    userDeleteDetails,
    navigate,
  ]);

  const handleEditUser = (id) => {
    navigate(`/admin-edit-user/${id}`);
  };

  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete user: ${name}`)) {
      dispatch(adminDeleteUserAction(id));
    }
  };

  return (
    <div className='mt-4'>
      <h3>Admin, all users.</h3>
      {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
      {loading && <LoadingSpinner />}

      {message && <AlertMessage variant='info'>{message}</AlertMessage>}

      {loadingDelete && <LoadingSpinner />}

      {errorDelete && (
        <AlertMessage variant='danger'>{errorDelete}</AlertMessage>
      )}

      <Table className='mt-3 ' striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th className='text-center'>Admin</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            Array.isArray(users) &&
            users.map((item) => (
              <tr key={item.id}>
                <td className='align-middle'>{item.name}</td>
                <td className='align-middle'>{item.username}</td>
                <td className='align-middle'>{item.email}</td>
                <td className='text-center align-middle'>
                  {item.is_admin ? (
                    <i className='fas fa-check' />
                  ) : (
                    <i className='fas fa-xmark' />
                  )}
                </td>
                <td className='text-center'>
                  <Button
                    type='button'
                    variant='primary'
                    className='mx-1'
                    onClick={() => handleEditUser(item.id)}
                    size='sm'
                  >
                    <i className='fas fa-pen-to-square'></i> &nbsp;Edit User
                  </Button>
                  <Button
                    type='button'
                    variant='danger'
                    className='mx-1'
                    onClick={() => handleDeleteUser(item.id, item.username)}
                    size='sm'
                  >
                    <i className='fas fa-circle-xmark'></i> &nbsp;Delete User
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <hr />
    </div>
  );
}
