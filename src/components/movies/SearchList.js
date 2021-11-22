import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import MovieItem from "./MovieItem";
import classes from "./SearchList.module.css";

const SearchList = (props) => {
  const [searchMoviesList, setSearchMoviesList] = useState([]);
  const { isLoading, request, error } = useHttp();
  useEffect(() => {
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
      console.log(searchMoviesList);
    };
    request(
      {
        url: url,
        method: "GET",
        header: {},
      },
      transfrmationMethod
    );
  }, [props.searchKey]);

  return <div className={`${classes["search-list"]} rounded shadow`}>
    {!isLoading &&
      searchMoviesList.map((movie) => (
        <MovieItem
          key={movie.id}
          title={movie.title}
          backdrop={movie.backdrop_path}
          description={movie.overview}
          release={movie.release_date}
        />
      ))}
    {isLoading && (
      <div class={`d-flex justify-content-center ${classes["spinner-placing"]}`}>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )}
  </div>;
};

export default SearchList;
