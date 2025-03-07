import PropTypes from 'prop-types';

import './Footer.css';
import TasksFilter from '../TasksFilter';

const Footer = ({ filterSelected, toggleFilter, deletCompletedTask, activeCount }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <TasksFilter filterSelected={filterSelected} toggleFilter={toggleFilter} />
      <button className="clear-completed" onClick={deletCompletedTask}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  filterSelected: PropTypes.string.isRequired,

  toggleFilter: PropTypes.func.isRequired,
  deletCompletedTask: PropTypes.func.isRequired,

  activeCount: PropTypes.number.isRequired,
};

export default Footer;
