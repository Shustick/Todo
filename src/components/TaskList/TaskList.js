import Task from '../Task';
import './TaskList.css'

const TaskList = ({ props }) => {
    const elements = props.map((item, index) => {
      return (
            <li key={index} className={item.taskClass}>
                <Task { ...item } />
                { item.taskClass === "editing" && (
                    <input type="text" className="edit" value="Editing task" />
                )}
            </li>
        )
    });
    
    return (
      <ul className="todo-list">
        { elements }
      </ul>
    );
}

export default TaskList;