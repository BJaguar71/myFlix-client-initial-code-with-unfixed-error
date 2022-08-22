import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback)
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.Image} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre:
            <span className="value">{movie.Genre.Name}</span>
            <span className="value">{movie.Genre.Description}</span>
          </span>
        </div>
        <div className="movie-summary">
          <span className="label">Summary: </span>
          <span className="value">{movie.Summary}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}
          </span>
          <span className="value">{movie.Director.Bio}
          </span>
          <img src={movie.Director.Image} />
        </div>
        <div className="movie-actor">
          <span className="label">Actor: </span>
          <span className="value">{movie.Actor}</span>
        </div>
        <div className="movie-year">
          <span className="label">Releas: </span>
          <span className="value">{movie.Year}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }),
    Summary: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired
    }),
    Actors: PropTypes.array.isRequired,
    Image: PropTypes.string.isRequired,
    Year: PropTypes.number.isRequired,
    Featured: PropTypes.bool
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
