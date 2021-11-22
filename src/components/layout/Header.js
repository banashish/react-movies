import React, { useContext, useRef, useEffect } from "react";
import SettingsContext from "../../store/settings-context";

const Header = () => {
  const settingsContext = useContext(SettingsContext);
  const searchInput = useRef("");
  const onSearchHandler = () => {
    const searchkey = searchInput.current.value.trim();
    if (!searchkey) {
      return;
    }
    settingsContext.set_search_key(searchkey);
  };

  const onInputHandler = (event) => {
    if (event.target.value === "") {
        settingsContext.set_search_key('')
    }
  };

  const keyPressHandler = event =>  {
      if(event.charCode === 13) {
          event.preventDefault();
        const searchkey = searchInput.current.value.trim();
        if (!searchkey) {
          return;
        }
        settingsContext.set_search_key(searchkey);
      }
  }

  return (
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand">ReactMovies</a>
        <form class="d-flex">
          <input
            ref={searchInput}
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onInput={onInputHandler}
            onKeyPress={keyPressHandler}
          />
          <button
            class="btn btn-outline-success"
            type="button"
            onClick={onSearchHandler}
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default React.memo(Header);
