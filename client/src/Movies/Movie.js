import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, []);

  const deleteMovie = e => {
    //e.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`, movie)
    .then(res => {
      window.history.push("/movies");
    })
    .catch(err => console.log(err.response));
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  console.log("This is from movie.js", movie);
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="update-button" onClick={()=>history.push(`/movies/update-movie/${movie.id}`)}>
        Update This </div>  
        <div className="delete-button" onClick={(e)=>deleteMovie(e)}>Delete This</div>
      
    </div>
  );
}

export default Movie;
