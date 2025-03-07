import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ description, created, id, done, onCheckboxChange, onDeleted, onEdit }) => {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} onChange={() => onCheckboxChange(id)} />
      <label>
        <span className="description">{description}</span>
        <span className="created">{created}</span>
      </label>
      <button className="icon icon-edit" onClick={onEdit}></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );
};

Task.propTypes = {
  description: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,

  onCheckboxChange: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Task;
