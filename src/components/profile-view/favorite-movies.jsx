import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';

import './profile-view.scss';

export function FavoriteMovies(props) {
  const { movies, favoriteMovies, currentUser, token } = props;
  const favoriteMovieList = movies.filter((m) => {
    return favoriteMovies.includes(m._id);
  });

  const handleMovieDelete = (movieId) => {
    axios
      .delete(
        `https://t-flix.fly.dev/users/${currentUser}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert('The movie was successfully removed.');
        window.open('/users/:username', '_self');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {favoriteMovieList.length === 0 ? (
        <p>You have not added movies to your list yet</p>
      ) : (
        favoriteMovieList.map((movie) => {
          return (
            <Col xs={10} sm={8} md={6} lg={4}>
              <Card id="movie-card">
                <Link to={`/movies/${movie._id}`}>
                  <Card.Img variant="top" src={movie.Image} crossOrigin="anonymous" />
                </Link>
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Summary}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button
                      className="button"
                      variant="outline-primary"
                      size="sm"
                    >
                      Open
                    </Button>
                  </Link>
                  <Button
                    className="button ml-2"
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      handleMovieDelete(movie._id);
                    }}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      )}
    </>
  );
}
