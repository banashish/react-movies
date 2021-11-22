import { useState, useContext } from "react";
import classes from "./Movies.module.css";
import MovieList from "./MovieList";
import SettingsContext from "../../store/settings-context";
import SearchList from "./SearchList";

const Movies = () => {
  const { search_key } = useContext(SettingsContext);
  const [startPopular, setStartPopular] = useState(0);
  const [startRated, setStartRated] = useState(0);
  const [startUpcoming, setStartUpcoming] = useState(0);
  const [moviesLength, setMoviesLength] = useState({
    popular: 0,
    upcoming: 0,
    top_rated: 0
  })
  let content;

  const moviesNextLimitHandler = (obj) => {
    setMoviesLength(length => {
      return {
        ...length,
        ...obj
      }
    })
  }
  
  const rightClickhandler = (category, action) => {
    if (action === "prev") {
      if (category === "popular") {
        if (startPopular < 4) return;
        setStartPopular((state) => {
          return state - 4;
        });
      } else if (category === "top_rated") {
        if (startRated < 4) return;
        setStartRated((state) => {
          return state - 4;
        });
      } else {
        if (startUpcoming < 4) return;
        setStartUpcoming((state) => {
          return state - 4;
        });
      }
    } else {
      if (category === "popular") {
        if (startPopular > moviesLength.popular - 4) return;
        setStartPopular((state) => {
          return state + 4;
        });
      } else if (category === "top_rated") {
        if (startRated > moviesLength.top_rated - 4) return;
        setStartRated((state) => {
          return state + 4;
        });
      } else {
        if (startUpcoming > moviesLength.upcoming - 4) return;
        setStartUpcoming((state) => {
          return state + 4;
        });
      }
    }
  };

  if(search_key) {
    content =  <SearchList searchKey={search_key} />
  }
  else {
    content = (
    <>
    <div className={`${classes.category} rounded mt-2`}>
      <div>
        <h3 className={`text-start ${classes["category-heading"]}`}>
          Popular
        </h3>
        <i
          class={`bi bi-chevron-right float-end ${classes["actions-icon"]}`}
          onClick={rightClickhandler.bind(null, "popular", "next")}
        ></i>
        <i
          class={`bi bi-chevron-left float-end ${classes["actions-icon"]}`}
          onClick={rightClickhandler.bind(null, "popular", "prev")}
        ></i>
      </div>
      <MovieList type="popular" start={startPopular} setMoviesLimit={moviesNextLimitHandler}/>
    </div>
    <div className={`${classes.category} rounded`}>
      <h3 className={`text-start ${classes["category-heading"]}`}>
        Best Rated
      </h3>
      <i
        class={`bi bi-chevron-right float-end ${classes["actions-icon"]}`}
        onClick={rightClickhandler.bind(null, "top_rated", "next")}
      ></i>
      <i
        class={`bi bi-chevron-left float-end ${classes["actions-icon"]}`}
        onClick={rightClickhandler.bind(null, "top_rated", "prev")}
      ></i>
      <MovieList type="top_rated" start={startRated} setMoviesLimit={moviesNextLimitHandler}/>
    </div>
    <div className={`${classes.category} rounded`}>
      <h3 className={`text-start ${classes["category-heading"]}`}>
        Upcoming
      </h3>
      <i
        class={`bi bi-chevron-right float-end ${classes["actions-icon"]}`}
        onClick={rightClickhandler.bind(null, "upcoming", "next")}
      ></i>
      <i
        class={`bi bi-chevron-left float-end ${classes["actions-icon"]}`}
        onClick={rightClickhandler.bind(null, "upcoming", "prev")}
      ></i>
      <MovieList type="upcoming" start={startUpcoming} setMoviesLimit={moviesNextLimitHandler}/>
    </div>
    </>)
  }
  return <div className="container">{content}</div>;
};

export default Movies;
