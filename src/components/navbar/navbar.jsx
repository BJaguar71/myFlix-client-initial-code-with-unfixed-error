import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'react-router-dom';

export function Navbar({user}) {
//Sign out method
const onLoggedOut = () => {
  localStorage.clear();
  window.open('/', '_self');
}
// defined a method that returns a token from local storage
  const isAuth = () => {
    if(typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">T-Flix Movie App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            {/* if user logs in user part will be shown in navbar */}
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
            )}
            <NavDropdown title="Movies" id="navbarScrollingDropdown">
              <NavDropdown.Item href={`/genres`}>Genre</NavDropdown.Item>
              <NavDropdown.Item href={`/directors`}>
                Directors
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          {/* hides login and sign up if the token exists */}
          {isAuth() && (
            <Button variant="danger" onClick={() => { onLoggedOut() }}>Logout</Button>
          )}
          {!isAuth() && (
            <Button variant='outline-primary' href='/register' type="submit">Sign-up</Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}