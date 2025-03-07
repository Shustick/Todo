import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

export default class TasksFilter extends Component {
  selectFilter = (e) => {
    const selectedClass = e.target.className.split(' ')[0];
    this.props.toggleFilter(selectedClass);
  };

  render() {
    return (
      <ul className="filters" onClick={this.selectFilter}>
        <li>
          <button className={`btn-all ${this.props.filterSelected === 'btn-all' ? 'selected' : ''}`}>All</button>
        </li>
        <li>
          <button className={`btn-active ${this.props.filterSelected === 'btn-active' ? 'selected' : ''}`}>
            Active
          </button>
        </li>
        <li>
          <button className={`btn-completed ${this.props.filterSelected === 'btn-completed' ? 'selected' : ''}`}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  filterSelected: PropTypes.string.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};
