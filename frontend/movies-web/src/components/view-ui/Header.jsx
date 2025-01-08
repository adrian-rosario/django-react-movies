import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { userLogoutAction } from "../../state/actions/user";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails, loading } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogoutAction());
    navigate("/");
  };

  return (
    <>
      <Navbar bg='light' data-bs-theme='light'>
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <i className='fas fa-film'></i>&nbsp;Movie Ratings
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => navigate("/")}>
              <i className='fas fa-home'></i>&nbsp;Home
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/mission")}>
              <i className='fas fa-paperclip'></i>&nbsp;Mission
            </Nav.Link>

            {userDetails && userDetails.name ? (
              <>
                <Nav.Link onClick={() => navigate("/add-movie")}>
                  <i className='fas fa-mug-hot'></i>&nbsp;Add Movie
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/profile")}>
                  <i className='fas fa-user'></i>&nbsp;Profile
                </Nav.Link>
                {userDetails.is_admin && (
                  <>
                    <i className='fas fa-users adminIcon'></i>
                    <NavDropdown title='Admin' id='basic-nav-dropdown'>
                      <NavDropdown.Item
                        onClick={() => navigate("/admin-users")}
                      >
                        Users
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        onClick={() => navigate("/admin-movies")}
                      >
                        Movies
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        onClick={() => navigate("/admin-ratings")}
                      >
                        Ratings
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
                <Nav.Link onClick={handleLogout}>
                  <i className='fas fa-lock'></i>&nbsp;Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link disabled>
                  <i className='fas fa-user'></i>&nbsp;Profile
                </Nav.Link>

                <Nav.Link onClick={() => navigate("/login")}>
                  <i className='fas fa-lock-open'></i>&nbsp;Login
                </Nav.Link>

                {loading && <LoadingSpinner height='16px' width='16px' />}
              </>
            )}
          </Nav>

          {userDetails && userDetails.name && (
            <div className='d-flex justify-content-end'>
              Welcome {userDetails.name} &nbsp;
              <i className='fas fa-earth-americas mt-1'></i>
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
}
