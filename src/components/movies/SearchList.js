import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import MovieItem from "./MovieItem";
import classes from "./SearchList.module.css";

const SearchList = (props) => {
  const [searchMoviesList, setSearchMoviesList] = useState([]);
  const { isLoading, request, error } = useHttp();
  if (searchMoviesList.length === 0 && !isLoading && !error) {
    const url = new URL(`https://api.themoviedb.org/3/search/movie`);
    const params = new URLSearchParams({
      api_key: "7b60c2cffaf2430c6939fed57f8ec4d5",
      language: "en-US",
      page: 1,
      query: props.searchKey,
    }).toString();
    url.search = params;
    const transfrmationMethod = (data) => {
      setSearchMoviesList(data.results);
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

  return (
    <div className={`${classes["search-list"]} rounded shadow`}>
      {isLoading && (
        <div
          class={`d-flex justify-content-center ${classes["spinner-placing"]}`}
        >
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading &&
        !error &&
        searchMoviesList.map((movie) => (
          <MovieItem
            key={movie.id}
            title={movie.title}
            backdrop={movie.backdrop_path}
            description={movie.overview}
            release={movie.release_date}
          />
        ))}
      {!isLoading && error && (
        <div className={`${classes["invalid"]}`}>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default SearchList;
