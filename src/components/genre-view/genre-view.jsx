import React from "react";
import { Container, Row, Button } from 'react-bootstrap';
import { MovieCard } from "../movie-card/movie-card";

export function GenreView(props) {
  const { genre, genreMovies, goBack } = this.props;

  return (
    <Container>
      <Button variant='outline-dark' onClick={goBack}>Back</Button>
      <h1>{genre.Name}</h1>
      <h2>Description:</h2>
      <p>{genre.Description}</p>
      <h2>Movies on this genre:</h2>
      <Row className='justify-content-center'>
        {genreMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie}>
            {movie.Title}
          </MovieCard>
        ))}
      </Row>
    </Container>
  );
}