import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  async function fetchMoviesHandler() {
    setDataLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        releaseDate: movieData.release_date,
        openingText: movieData.opening_crawl,
      };
    });
    setMovies(transformedMovies);
    setDataLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!dataLoading && movies.length === 0 && <p>No movies</p>}
        {!dataLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {dataLoading && <p>Fetching movies...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
