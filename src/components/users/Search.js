import React, { useState, useContext } from 'react';

import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

let Search = () => {
  let githubContext = useContext(GithubContext);
  let alertContext = useContext(AlertContext);
  let { searchUsers, users, clearUsers } = githubContext;

  let [text, setText] = useState('');

  let onChange = e => setText(e.target.value);

  let onSubmit = e => {
    e.preventDefault();

    if (!text) {
      alertContext.setAlert('Please enter text', 'light');
      return false;
    }

    searchUsers(text);
    setText('');
  };

  return (
    <div>
      <form className="form mb-1" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Text"
          value={text}
          onChange={onChange}
        />
        <button type="submit" className="btn btn-dark btn-block">
          Submit
        </button>
      </form>
      {users.length > 0 && (
        <button
          type="button"
          className="btn btn-ligh btn-block"
          onClick={clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
