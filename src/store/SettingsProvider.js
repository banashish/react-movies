import { useEffect, useReducer } from "react";
import SettingsContext from "./settings-context";
import useHttp from "../hooks/use-http";

const settingsReducer = (state, action) => {
  if (action.type === "SET_CONFIGURATION_KEYS") {
    return {
      ...state,
      configUrl: action.value.config_url,
      backdropSizes: action.value.backdrop_sizes,
    };
  }
  else if(action.type === "SET_SEARCH_KEY") {
    return {
      ...state,
      searchKey: action.value
    };
  }
  return defaultState;
};

const defaultState = {
  configUrl: "",
  backdropSizes: [],
  searchKey: "",
};

const SettingsProvider = (props) => {
  const { isLoading, request, error } = useHttp();
  const [state, dispatch] = useReducer(settingsReducer, defaultState);
  useEffect(() => {
    const url = new URL(`https://api.themoviedb.org/3/configuration`);
    const params = new URLSearchParams({
      api_key: "7b60c2cffaf2430c6939fed57f8ec4d5",
    }).toString();
    url.search = params;
    const transformationMethod = (data) => {
      dispatch({
        type: "SET_CONFIGURATION_KEYS",
        value: {
          config_url: data.images.base_url,
          backdrop_sizes: data.images.backdrop_sizes,
        },
      });
    };
    request(
      {
        url: url,
        method: "GET",
        header: {},
      },
      transformationMethod
    );
  }, []);
  
  const setSearchKey = (searchKey) => {
    dispatch({
      type: "SET_SEARCH_KEY",
      value: searchKey
    })
  }
  const settingsContextValue = {
    config_url: state.configUrl,
    backdrop_sizes: state.backdropSizes,
    search_key: state.searchKey,
    set_search_key: setSearchKey,
  };

  return (
    <SettingsContext.Provider value={settingsContextValue}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
