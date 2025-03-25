import PropTypes from 'prop-types';
import './Task.css';

import Timer from './Timer/Timer';

const Task = ({
  description,
  created,
  id,
  done,
  min,
  sec,
  onCheckboxChange,
  onDeleted,
  onEdit,
  startTimer,
  stopTimer,
}) => {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} onChange={() => onCheckboxChange(id)} />
      <label>
        <span className="title">{description}</span>
        <Timer id={id} min={min} sec={sec} startTimer={startTimer} stopTimer={stopTimer} />
        <span className="description">{created}</span>
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
