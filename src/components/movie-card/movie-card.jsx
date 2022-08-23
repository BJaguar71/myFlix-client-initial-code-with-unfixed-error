import React from 'react';
import PropTypes from 'prop-types';
//imported react bootstrap component
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.Image} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Summary}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

/* setting the static proptypes to an obj contains special values provided by proptypes */
MovieCard.propTypes = {
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
  onMovieClick: PropTypes.func.isRequired
};