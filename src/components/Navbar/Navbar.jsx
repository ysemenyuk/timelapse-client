import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { userActions } from '../../redux/user/userSlice.js';

function NavBar() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(userActions.logout());
  };

  return (
    <Navbar className="navbar-expand-lg navbar-light bg-light mb-4">
      <Container className="px-3">
        <Navbar.Brand as={Link} to="/cameras" className="navbar-brand mr-auto">
          Timelapse
        </Navbar.Brand>
        <Link to="/cameras" className="navbar-brand mr-auto">
          Timelapse
        </Link>
        <If condition={isLoggedIn}>
          <Nav className="collapse navbar-collapse">
            <Nav.Item as="li">
              <Link className="nav-link" to="/cameras">
                All cameras
              </Link>
            </Nav.Item>
          </Nav>
        </If>
        <NavDropdown title="Lng" id="lng">
          <NavDropdown.Item eventKey="eng">Eng</NavDropdown.Item>
          <NavDropdown.Item eventKey="ru">Ru</NavDropdown.Item>
        </NavDropdown>
        <Choose>
          <When condition={isLoggedIn}>
            <div>
              <Link className="" to="/user">
                Profile
              </Link>
              <Button onClick={logoutHandler} variant="link" className="me-2">
                LogOut
              </Button>
            </div>
          </When>
          <Otherwise>
            <div>
              <Link className="me-3" to="/login">
                LogIn
              </Link>
              <Link className="me-3" to="/signup">
                SignUp
              </Link>
            </div>
          </Otherwise>
        </Choose>

      </Container>
    </Navbar>
  );
}

export default NavBar;
