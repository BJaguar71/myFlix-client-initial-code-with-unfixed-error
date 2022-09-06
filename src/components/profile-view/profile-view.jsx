import React from 'react';
import axios from 'axios';
import { Button, Container, Row } from 'react-bootstrap';


export const ProfileView = (props) => {
  const { favoriteMovies, goBack, movies, handleFavorite } = props;
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const deleteAccount = () => {
    axios
      .delete(`https://t-flix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert(`Your account was deleted.`);
        localStorage.clear();
        window.open('/', '_self');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container style={{ width: '80%' }}>
      <h1>
        Profile of <span>{username}</span>
      </h1>
      <Button variant="warning" onClick={goBack}>
        « Back
      </Button>

      <h3>
        Email: <span>{email}</span>
      </h3>
      <h2 >Favorite movies:</h2>
      <Row className="justify-content-center">
        {favoriteMovies.map((movieId) => {
          let movie = movies.find((m) => m._id === movieId);
          return (
            <FavoriteCard
              key={movieId}
              movie={movie}
              handleFavorite={handleFavorite}
            >
              {movie.title}
            </FavoriteCard>
          );
        })}
      </Row>
    </Container>
  );
};