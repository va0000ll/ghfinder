import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

let github_client_id = null;
let github_client_secret = null;

if (process.env.NODE_ENV !== 'production') {
  github_client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  github_client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  github_client_id = process.env.APP_GITHUB_CLIENT_ID;
  github_client_secret = process.env.APP_GITHUB_CLIENT_SECRET;
}

let GithubState = props => {
  let initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  let [state, dispatch] = useReducer(GithubReducer, initialState);

  let searchUsers = async text => {
    setLoading();
    let res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${github_client_id}&client_secret=${github_client_secret}`
    );

    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  let setLoading = () => dispatch({ type: SET_LOADING });

  // Clear users
  let clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Get Github user
  let getUser = async username => {
    setLoading();
    let res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${github_client_id}&client_secret=${github_client_secret}`
    );

    dispatch({ type: GET_USER, payload: res.data });
  };

  // Get User Repos
  let getUserRepos = async username => {
    setLoading();
    let res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${github_client_id}&client_secret=${github_client_secret}`
    );

    dispatch({ type: GET_REPOS, payload: res.data });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
