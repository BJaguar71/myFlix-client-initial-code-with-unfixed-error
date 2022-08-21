// Importing React to create the component
import React from  'react';

// Importing axios
import axios from 'axios';

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

    });
  }
  // Rendering the visual representation of the component
  render () {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>

        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
        ))
        }
      </div>
    );
  }
}