import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";

const MovieCard = props => {

  const { title, director, metascore, stars } = props.movie;

  const updateMovie = (e) => {
    // Why do I need this and why do I only need it in the list view?
    e.preventDefault();
    // Why does this not work...
    //e.stopPropagation();
    console.log('update movie callback');
    props.history.push(`/update-movie/${props.movie.id}`);
  };

  const deleteMovie = (e) => {
    //e.preventDefault();
    axios.delete(`http://192.168.1.211:5000/api/movies/${props.movie.id}`)
      .then((res) => {
        props.setMovieList(props.movieList.filter(tempMovie => {
          return tempMovie.id !== props.movie.id;
        }));
        props.history.push('/');
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <button type='button' className="update-button" onClick={updateMovie}>
        Update
      </button>
      <button type='button' className="delete-button" onClick={deleteMovie}>
        Delete
      </button>
    </div>
  );
};

export default withRouter(MovieCard);
