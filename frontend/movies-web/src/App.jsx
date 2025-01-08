import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/view-ui/Header";
import Footer from "./components/view-ui/Footer";
import Home from "./components/views/Home";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import UserProfile from "./components/views/UserProfile";
import MovieDetail from "./components/views/MovieDetail";
import Mission from "./components/views/Mission";
import AddMovie from "./components/views/AddMovie";
import EditMovie from "./components/views/EditMovie";
import AdminListUsers from "./components/views/AdminListUsers";
import AdminEditUser from "./components/views/AdminEditUser";
import AdminListRatings from "./components/views/AdminListRatings";
import AdminListMovies from "./components/views/AdminListMovies";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route index element={<Home />} exact />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/movie-details/:id' element={<MovieDetail />} />
            <Route path='/mission' element={<Mission />} />
            <Route path='/add-movie' element={<AddMovie />} />
            <Route path='/edit-movie/:id' element={<EditMovie />} />
            <Route path='/admin-users' element={<AdminListUsers />} />
            <Route path='/admin-edit-user/:id' element={<AdminEditUser />} />
            <Route path='/admin-ratings' element={<AdminListRatings />} />
            <Route path='/admin-movies' element={<AdminListMovies />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
