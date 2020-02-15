import React, { useState } from 'react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import Header from './Header';

export default function MovieApp() {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [alertStatus, toggleAlertStatus] = useState(false);

  const inputAlert = () => toggleAlertStatus(movie.title ? false : true);

  const deleteMovie = id => {
    setSearchedMovies(searchedMovies.filter(movie => movie.imdbID !== id));
  };

  return (
    <div>
      <Header />
      <SearchBar
        searchedMovies={searchedMovies}
        setSearchedMovies={setSearchedMovies}
        setLoading={setLoading}
        movie={movie}
        setMovie={setMovie}
        inputAlert={inputAlert}
      />

      {!movie.Title && alertStatus && !loading && (
        <h1 style={errorBox}>Please enter a correct movie data!</h1>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {searchedMovies.map(movieData => (
            <MovieCard key={movieData.imdbID} movieData={movieData} deleteMovie={deleteMovie} />
          ))}
        </div>
      )}
    </div>
  );
}

const errorBox = {
  margin: 'auto',
  color: 'darkRed',
  padding: '3%',
  fontFamily: 'arial',
};
