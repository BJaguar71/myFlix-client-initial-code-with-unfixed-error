// Importing React to create the component
import React from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './main-view.scss';
import { Navbar } from '../navbar/navbar';
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
      user: null
    };
  }
  // updated the method to persist the login data 
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
      user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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

  // // logout function
  // onLoggedOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.setState({
  //     user: null
  //   });
  // }

  // adding a new GetMovie method in order to be able to make authenticated requests to the API and see the list of movies
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
    const { movies, user } = this.state;

    return (
      <Router>
      {/* placed Navabr */}
        <Navbar users={user} />
        <Container>
        <Row className="main-view justify-content-md-center">
          {/* Routing starts from here */}
          <Route exact path="/" render={() => {
            /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
            if(!user) return <Col>
              <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            // before the movies have been laoded
            if (movies.length === 0) return <div className="main-view" />;

            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }
        </Row>
      </div>
  );
  }
}