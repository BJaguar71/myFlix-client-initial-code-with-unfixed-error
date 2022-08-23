// Importing React to create the component
import React from  'react';

// Importing axios
import axios from 'axios';

import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';

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
  // fetching list of movies from t-flix API using axios's get method
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

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user){
    this.setState({
      user
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
        {/*if the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
      
        {selectedMovie
        ? (
          <Row className="justify-content-md-center">
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          </Row>
        )
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
        ))
        }
      </div>
    );
  }
}