import React from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

const TasksFilter = ({ filterSelected, toggleFilter }) => {
  const selectFilter = (e) => {
    const selectedClass = e.target.className.split(' ')[0];
    toggleFilter(selectedClass);
  };

  return (
    <ul className="filters" onClick={selectFilter}>
      <li>
        <button className={`btn-all ${filterSelected === 'btn-all' ? 'selected' : ''}`}>All</button>
      </li>
      <li>
        <button className={`btn-active ${filterSelected === 'btn-active' ? 'selected' : ''}`}>Active</button>
      </li>
      <li>
        <button className={`btn-completed ${filterSelected === 'btn-completed' ? 'selected' : ''}`}>Completed</button>
      </li>
    </ul>
  );
};

TasksFilter.propTypes = {
  filterSelected: PropTypes.string.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};

export default TasksFilter;
