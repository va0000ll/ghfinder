import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repo: { name, html_url } }) => {
  return (
    <div className="card">
      <h1>
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </h1>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
