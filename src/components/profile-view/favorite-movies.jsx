import React from 'react';
import { Link } from 'react-router-dom';

export function FavoriteMovies({favoriteMovieList}) {
  return (
    <>
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.Image} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <button variant='secondary'>Remove from list</button>
          </div>
        );
      })}
    </>
  );
}