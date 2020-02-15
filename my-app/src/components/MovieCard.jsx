import React from 'react';

export default function MovieCard({ movieData, deleteMovie }) {
  return (
    <div className='card mx-auto col-md-12 col-sm-12 col-sm-12 p-2' style={{ width: '25rem' }}>
      <img className='card-img-top' src={movieData.Poster} alt={movieData.Title} />
      <div className='card-body'>
        <h5 className='card-title'>{movieData.Title}</h5>
        <p className='card-text'>{movieData.Plot}</p>
        <button className='btn btn-primary' onClick={() => deleteMovie(movieData.imdbID)}>
          Remove
        </button>
      </div>
    </div>
  );
}
