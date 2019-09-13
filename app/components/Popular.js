import React, { useReducer, useState, useEffect } from "react";
import { stringify } from "querystring";
import { fetchPopularRepos } from "./utils/api";
import NavPopular from "./common/NavPopular";
import ReposGrid from "./common/ReposGrid";
import Loading from "./common/Loading";

function fetchReducer(state, action) {
  if (action.type === "FETCH_INIT") {
    return {
      ...state,
      loading: true,
      repos: {
        ...state.repos,
        [action.language]: null
      }
    };
  } else if (action.type === "FETCH_ERROR") {
    return {
      ...state,
      repos: {
        ...state.repos,
        [action.language]: action.data
      },
      loading: false,
      error: action.error
    };
  } else if (action.type === "FETCH_SUCCESS") {
    return {
      ...state,
      repos: {
        ...state.repos,
        [action.language]: action.data
      },
      loading: false,
      error: null
    };
  } else if (action.type === "FETCH_CACHED") {
    return {
      repos: {
        ...state.repos
      },
      loading: false,
      error: null
    };
  } else {
    throw new Error(`Action Type: ${action.type} is not supported!`);
  }
}

const initialFetchState = {
  error: null,
  loading: true,
  repos: []
};

export default function Popular() {
  const [state, dispatch] = useReducer(fetchReducer, initialFetchState);
  const [language, setLanguage] = useState("All");

  useEffect(() => {
    if (state.repos[language]) {
      dispatch({ type: "FETCH_CACHED" });
      return;
    }

    dispatch({ type: "FETCH_INIT", language: language });
    fetchPopularRepos(language)
      .then(data => {
        dispatch({ type: "FETCH_SUCCESS", language, data });
      })
      .catch(error => {});
  }, [language]);

  if (state.loading === true) {
    return <Loading content="Fetching repositories" />;
  }

  return (
    <React.Fragment>
      <NavPopular
        selected={language}
        onUpdateLanguage={lang => setLanguage(lang)}
      />

      {state.error && <p className="center-text error">{state.error}</p>}
      {state.repos[language] && <ReposGrid repos={state.repos[language]} />}
    </React.Fragment>
  );
}
