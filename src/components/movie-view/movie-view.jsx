import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';
import axios from 'axios';

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  addMovie(movieId) {
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .post(`https://t-flix.fly.dev/users/${currentUser}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert('The movie was successfully added.');
      })
      .catch((err) => console.log(err));
  }

  deleteMovie(movieId) {
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .delete(`https://t-flix.fly.dev/users/${currentUser}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert('The movie was successfully removed.');
        window.open(`users/${currentUser}`, '_self');
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { movie, onBackClick, deleteMovie, addMovie } =
      this.props;

    return (
      <Container fluid className="movieViewContainer">
        <Row>
          <Col>
            <img className="movie-poster" crossOrigin="anonymous" src={movie.Image} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-Summary">
              <span className="label">Summary: </span>
              <span className="value">{movie.Summary}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-releaseyear">
              <span className="label">ReleaseYear: </span>
              <span className="value">{movie.Year}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-director">
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Director</Button>
              </Link>
            </div>
            <div>{`Bio: ${movie.Director.Bio}`}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-genre">
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre: {movie.Genre.Name}</Button>
              </Link>
            </div>
            <div>{`Description: ${movie.Genre.Description}`}</div>
            <Button
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
            <Button className="ml-2 my-2">Add to Favorites</Button>
            <Button className="ml-2">Remove from Favorites</Button>
          </Col>
        </Row>
      </Container>
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
