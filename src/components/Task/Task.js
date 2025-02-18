import './Task.css'

const Task = ({ description, created }) => {
    return (
        <div className="view">
            <input className="toggle" type="checkbox" />
            <label>
                <span class="description">{description}</span>
                <span class="created">{created}</span>
            </label>
            <button class="icon icon-edit"></button>
            <button class="icon icon-destroy"></button>
        </div>
    )
}

export default Task;