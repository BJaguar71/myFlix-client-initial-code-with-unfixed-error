// Importing React to create the component
import React from  'react';

// importing MovieCard component
import { MovieCard } from '../movie-card/movie-card';

// importing MovieView component
import { MovieView } from '../movie-view/movie-view';

// Making and exposing the MainView component in order to be usable in other files using the React.Component template
export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        {_id: 1, Title:"The Matrix", Director:{Name:"The Wachowskis",Bio:"Lana(1965) and Lilly(1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers.The sisters are both trans women.They have also made video games of their famous trilogy Matrix.", Image:"https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"}, Summary:"When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber - intelligence.",Genre:{Name:"Sci-Fi", Decription:"Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science.This genre often incorporates space, biology, energy, time, and any other observable science."}, Image:"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.png", Year: 1999, Featured: true},
        {_id: 2, Title:"Paris Is Burning", Director:{ Name:"Jennie Livingston", Bio:"Jennie Livingston (February 24, 1962) is a director and writer, known for Paris Is Burning (1990), Pose (2018) and Who's the Top? (2005). Livingston is the niece of Hollywood film director Alan J. Pakula, Step-cousin of writer-producer Jon Boorstin, actor Bob Boorstin and Anna Boorstin. She attended NYU/Tisch School of the Arts.", Image:"https://www.imdb.com/name/nm0515255/mediaviewer/rm1350167553?ref_=ext_shr_lnk"}, Summary:"A chronicle of New York's drag scene in the 1980s, focusing on balls, voguing and the ambitions and dreams of those who gave the era its warmth and vitality.", Genre:{ Name:"Documentary", Description:"A non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."}, Image:"https://upload.wikimedia.org/wikipedia/en/0/0d/Paris-is-burning-movie-poster-md.jpg",Year:1990.0, Featured:true},
        {_id: 3, Title:"There's Something in the Water", Director:{Name:"Elliot Page", Bio:"Elliot Page (February 21, 1987) is a Canadian actor and producer. Page has received various accolades, including an Oscar nomination, two BAFTA and Emmy nominations, and a Satellite Award. Page publicly came out as transgender in December 2020. In March 2021, he became the first openly trans man to appear on the cover of Time magazine.", Image:"https://www.imdb.com/name/nm0680983/mediaviewer/rm1295716609?ref_=ext_shr_lnk"}, Summary:"The injustices and injuries caused by environmental racism in her home province, in this urgent documentary on Indigenous and African Nova Scotian women fighting to protect their communities, their land, and their futures.", Genre:{Name:"Documenatry",Description:"A non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."}, Image:"https://m.media-amazon.com/images/M/MV5BN2Y2MTkxYzItZGE3Ni00MTY1LTg4YjMtM2NjNTUyOWYwZjU2XkEyXkFqcGdeQXVyNTM0NTU5Mg@@._V1_FMjpg_UX1000_.jpg", Year:2019, Featured:true}
      ],
      selectedMovie: null
    };
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

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

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