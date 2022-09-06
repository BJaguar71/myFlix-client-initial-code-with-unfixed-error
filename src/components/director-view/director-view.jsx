import React from 'react';
import {Button, Row, Container} from 'react-bootstrap';

import { MovieCard} from '../movie-card/movie-card';


export function DirectorView(props) {
  const { director, directorMovies, goBack } = this.props;

  return (
    <Container>
      <Button variant='outline-dark' onClick={goBack}>Back</Button>
      <image className='director-img' src={director.Image} />
      <h1>{director.Name}</h1>
      <h2>Bio: </h2>
      <p>{director.Bio}</p>
      <h2>Directed Movies:</h2>
      <Row className='justify-content-center'>{directorMovies.map((movie) => (
        <MovieCard key={movie._id} movie={movie}>
          {movie.Title}
        </MovieCard>
      ))}
      </Row>
    </Container>
  );
}

