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
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand">ReactMovies</a>
        <form className="d-flex">
          <input
            ref={searchInput}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onInput={onInputHandler}
            onKeyPress={keyPressHandler}
          />
          <button
            className="btn btn-outline-success"
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
