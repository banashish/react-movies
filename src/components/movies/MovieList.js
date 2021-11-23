import React, { useState, useRef } from "react";
import classes from "./MovieList.module.css";
import MovieItem from "./MovieItem";
import useHttp from "../../hooks/use-http";

const MovieList = (props) => {
  const { type, start, setMoviesLimit } = props;
  const end = start + 4;
  const [movies, setMovies] = useState([]);
  const page = useRef(0);
  const { isLoading, request, error } = useHttp();
  if (movies.length < end && !isLoading) {
    const url = new URL(`https://api.themoviedb.org/3/movie/${type}`);
    const params = new URLSearchParams({
      api_key: "7b60c2cffaf2430c6939fed57f8ec4d5",
      language: "en-US",
      page: page.current + 1,
    }).toString();
    url.search = params;
    page.current = page.current+ 1;
    const transfrmationMethod = (data) => {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      const obj = {};
      obj[type] = data.total_results;
      setMoviesLimit(obj);
    };
    request(
      {
        url: url,
        method: "GET",
        header: {},
      },
      transfrmationMethod
    );
  }
  const movieItem = movies
    .slice(start, end)
    .map((movie) => (
      <MovieItem
        key={movie.id}
        title={movie.title}
        backdrop={movie.backdrop_path}
        description={movie.overview}
        release={movie.release_date}
      />
    ));
  return (
    <div className={classes["movie-list-wrapper"]}>
      {!isLoading && (
        <ul className={`row ${classes["movie-list"]}`}>{movieItem}</ul>
      )}
      {isLoading && (
        <div className={`d-flex justify-content-center`}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
