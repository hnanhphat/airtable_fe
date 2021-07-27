import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../redux/actions/auth.action";
import { requesterAction } from "../redux/actions/requester.action";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Modal,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const requester = useSelector((state) => state.requester.requester.data);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [formRegister, setFormRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const isAuth = useSelector((state) => state.auth.isAuth);

  // LOGIN
  const handleLoginChange = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formLogin;
    dispatch(authAction.login({ email, password }));
    setShowLogin(false);
  };

  // REGISTER
  const handleRegisterChange = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = formRegister;
    dispatch(authAction.register({ firstname, lastname, email, password }));
    setShowRegister(false);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    dispatch(authAction.logout());
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(requesterAction.getCurrentRequester());
    }
  }, [isAuth, dispatch]);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Airtable</Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          {isAuth ? (
            <Nav>
              <NavDropdown
                title={
                  requester && requester.firstname + " " + requester.lastname
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item type="button" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link type="button" onClick={() => setShowRegister(true)}>
                Register
              </Nav.Link>
              <Nav.Link type="button" onClick={() => setShowLogin(true)}>
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>

      {/* LOGIN */}
      <Modal centered show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleLoginChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleLoginChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* REGISTER */}
      <Modal centered show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegisterSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    onChange={handleRegisterChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={handleRegisterChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter"
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default Header;
