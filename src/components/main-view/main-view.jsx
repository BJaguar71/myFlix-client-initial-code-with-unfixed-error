// Importing React to create the component
import React from  'react';

// Importing axios
import axios from 'axios';

// importing MovieCard component
import { MovieCard } from '../movie-card/movie-card';

// importing MovieView component
import { MovieView } from '../movie-view/movie-view';

// Making and exposing the MainView component in order to be usable in other files using the React.Component template
export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null
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
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
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