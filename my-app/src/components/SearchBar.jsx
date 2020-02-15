import React, { useState } from 'react';

const API_KEY = '354a9113';

export default function SearchBar({
  searchedMovies,
  setSearchedMovies,
  setLoading,
  movie,
  setMovie,
  inputAlert,
}) {
  const [inputValue, setInputValue] = useState('');
  const [yearInput, setYearInput] = useState('');
  const [plotValue, setPlotValue] = useState('');

  const getMovie = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?&t=${inputValue}&y=${yearInput}&plot=${plotValue}&apikey=${API_KEY}`,
      );
      const jsonData = await res.json();
      await setMovie(jsonData);
      if (jsonData.Response === 'True') await setSearchedMovies([jsonData, ...searchedMovies]);
      await setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log(movie);

  const inputOnChange = e => {
    setInputValue(e.target.value);
  };

  const yearInputOnChange = e => {
    setYearInput(e.target.value);
  };

  const handleChange = e => {
    setPlotValue(e.target.value);
  };

  const clickSearchBtn = e => {
    if (inputValue) {
      e.preventDefault();
      getMovie();
      setLoading(true);
    }
    if (!movie.Title) {
      inputAlert();
    }

    setInputValue('');
    setYearInput('');
  };

  return (
    <div className='container'>
      <div className='form-group'>
        <form className='row'>
          <div className='form-group col-lg-4'>
            <label>
              Title
              <input
                type='text'
                className='form-control'
                onChange={e => inputOnChange(e)}
                value={inputValue}
              />
            </label>
          </div>
          <div className='form-group col-lg-4'>
            <label>
              Year
              <input
                type='text'
                className='form-control'
                onChange={e => yearInputOnChange(e)}
                value={yearInput}
              />
            </label>
          </div>
          <div className='form-group col-lg-4'>
            <label>
              Plot
              <select className='form-control' onChange={e => handleChange(e)}>
                <option>Short</option>
                <option>Full</option>
              </select>
            </label>
          </div>

          <button
            style={{ width: '90%', margin: 'auto' }}
            className='btn btn-dark btn-lg btn-block'
            type='submit'
            onClick={clickSearchBtn}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
