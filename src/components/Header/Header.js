import PropTypes from 'prop-types';

import './Header.css';
import NewTaskForm from '../NewTaskForm';

const Header = ({ addTask }) => {
  return (
    <header>
      <h1 className="header">todos</h1>
      <NewTaskForm addTask={addTask} />
    </header>
  );
};

Header.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default Header;
