import React, { Component } from 'react';

export class Search extends Component {
  state = {
    text: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.text) {
      this.props.showAlert('Please enter text', 'danger');
      return false;
    }

    this.props.searchUsers(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    let { showClear, clearUsers } = this.props;
    return (
      <div>
        <form className="form mb-1" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Text"
            value={this.state.text}
            onChange={this.onChange}
          />
          <button type="submit" className="btn btn-dark btn-block">
            Submit
          </button>
        </form>
        {showClear && (
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
  }
}

export default Search;
