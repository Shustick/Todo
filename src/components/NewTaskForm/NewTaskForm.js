import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ addTask }) => {
  const [description, setDescription] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const ondescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onMinChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d{0,3}$/.test(value)) {
      setMinutes(value);
    }
  };

  const onSecChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-5]?[0-9]$/.test(value)) {
      setSeconds(value);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      setDescription('');
      setMinutes('');
      setSeconds('');
      const finalMinutes = parseInt(minutes, 10) || 0;
      const finalSeconds = parseInt(seconds, 10) || 0;

      addTask(description, finalMinutes, finalSeconds);
    }
  };

  return (
    <form className="new-todo-form" onKeyDown={onKeyDown}>
      <input className="new-todo" placeholder="Task" autoFocus value={description} onChange={ondescriptionChange} />
      <input className="new-todo-form__timer" placeholder="Min" value={minutes} onChange={onMinChange} type="number" />
      <input className="new-todo-form__timer" placeholder="Sec" value={seconds} onChange={onSecChange} type="number" />
    </form>
  );
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
