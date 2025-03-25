import PropTypes from 'prop-types';

import Task from '../Task';
import './TaskList.css';

const TaskList = ({
  taskData,
  onCheckboxChange,
  onDeleted,
  onEdit,
  onEditDescription,
  onSave,
  startTimer,
  stopTimer,
}) => {
  const elements = taskData.map((item) => {
    return (
      <li key={item.id} className={item.taskClass}>
        <Task
          {...item}
          onCheckboxChange={onCheckboxChange}
          onDeleted={() => onDeleted(item.id)}
          onEdit={() => onEdit(item.id)}
          startTimer={() => startTimer(item.id)}
          stopTimer={() => stopTimer(item.id)}
        />
        {item.taskClass === 'editing' && (
          <input
            type="text"
            name="edit"
            className="edit"
            value={item.description}
            onChange={(e) => onEditDescription(item.id, e.target.value)}
            onKeyDown={(e) => onSave(item.id, e.key)}
          />
        )}
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  taskData: PropTypes.array.isRequired,

  onCheckboxChange: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEditDescription: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TaskList;
