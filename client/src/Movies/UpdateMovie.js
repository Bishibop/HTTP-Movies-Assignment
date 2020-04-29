import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import axios from "axios";

function UpdateMovie(props) {
  const params = useParams();
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  useEffect(() => {
    if (props.movieList.length > 0) {
      setMovie(props.movieList.find(movie => {
        return movie.id === parseInt(params.id);
      }));
    }
  }, [props.movieList]);

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://192.168.1.211:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
        props.setMovieList(props.movieList.map(tempMovie => {
          if (tempMovie.id === movie.id) {
            return res.data;
          } else {
            return tempMovie;
          }
        }));
        props.history.push('/');
      })
      .catch((err) => console.log(err.response));
  };

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleStarsChange = e => {
    setMovie({
      ...movie,
      stars: e.target.value.split(', ')
    });
  };

  return (
    <div className="update-movie">
      <h2>Update movie:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='title'
          name='title'
          value={movie.title}
          onChange={handleChange}
        />
        <br/>
        <input
          type='text'
          placeholder='director'
          name='director'
          value={movie.director}
          onChange={handleChange}
        />
        <br/>
        <input
          type='text'
          placeholder='metascore'
          name='metascore'
          value={movie.metascore}
          onChange={handleChange}
        />
        <br/>
        <input
          type='text'
          placeholder='stars'
          value={movie.stars.join(', ')}
          onChange={handleStarsChange}
        />
        <br/>
        <button type='submit'>Update Movie</button>
      </form>
    </div>
  );
}

export default withRouter(UpdateMovie);
