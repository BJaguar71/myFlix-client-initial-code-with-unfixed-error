// Importing React to create the component
import React from  'react';

// Importing axios
import axios from 'axios';

import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';

import { Container, Nav, Navbar, Button } from 'react-bootstrap';

import NavDropdown from 'react-bootstrap/NavDropdown';

import './main-view.scss';

// importing RegistrationView
import { RegistrationView } from '../registration-view/registration-view';

// importing LoginView component
import { LoginView } from '../login-view/login-view';

// importing MovieCard component
import { MovieCard } from '../movie-card/movie-card';

// importing MovieView component
import { MovieView } from '../movie-view/movie-view';

// Making and exposing the MainView component in order to be usable in other files using the React.Component template
export class MainView extends React.Component {

  constructor(){
    super();
    // initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }
  // updated the method to persist the login data 
  componentDidMount(){
    axios.get('https://t-flix.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  // creating setSelectedMovie component
  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // when a user successfully registers
  onRegistration(register) {
    this.setState({
      register,
    });
  }

  /* When a user successfully logs in, this function will store the user's token in local storage to hepl user stay logged in */
  onLoggedIn(authData){
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // adding a new GetMovie method in order to be able to make authenticated requests to the API
  getMovies(token) {
    axios.get('https://t-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // assigning the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // Rendering the visual representation of the component
  render () {
    const { movies, selectedMovie, user, register } = this.state;

    //if user is not registered the registration view appears
    if(!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />);

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // before the movies have been laoded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">T-Flix App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#account">My list</Nav.Link>
            <NavDropdown title="Movies" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Genre</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Director
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Release year</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="danger" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Container>
        </Navbar>
        <Row className="justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            ))
          }
        </Row>
      </div>
  );
  }
}