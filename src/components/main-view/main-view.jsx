// Importing React to create the component
import React from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import './main-view.scss';
import { Menubar } from '../menubar/menubar';
// importing RegistrationView
import { RegistrationView } from '../registration-view/registration-view';
// importing LoginView component
import { LoginView } from '../login-view/login-view';
// importing MovieCard component
import { MovieCard } from '../movie-card/movie-card';
// importing MovieView component
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';


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
{/* Username will appear on main view after successful login */}
        <Link to={`/users/${user}`}>{user}</Link>
        <Container>
        <Row className="main-view justify-content-md-center">
          {/* Routing starts from here */}
          <Route exact path="/" render={() => {
            /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
            if(!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            // before the movies have been laoded
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          {/* creatinhg route for navbar view */}
          <Route path='/register' render={() => {
            if (user) return <Redirect to='/' />
            return <Col lg={8} md={8}>
              <RegistrationView />
            </Col>
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
          {/* check if user has the auth to open the link */}
            if(!user) return <Col md={8}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>
            if (movies.length === 0) return <div className='main-view' />
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)}  onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0 ) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0 ) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path={`/users/${user}`} render={({history}) => {
            if (!user) return <Redirect to='/' />
            return <Col>
              <ProfileView user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path='/users/:username' render={({match, history}) => {
            if (!user) return <Redirect to='/' />
            return <Col>
              <UserUpdate user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
        </Container>
      </Router>
    );
  }
}