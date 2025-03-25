import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    description: '',
    minutes: '',
    seconds: '',
  };

  ondescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onMinChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d{0,3}$/.test(value)) {
      this.setState({
        minutes: value,
      });
    }
  };

  onSecChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-5]?[0-9]$/.test(value)) {
      this.setState({
        seconds: value,
      });
    }
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        description: '',
        minutes: '',
        seconds: '',
      });
      const minutes = parseInt(this.state.minutes, 10) || 0;
      const seconds = parseInt(this.state.seconds, 10) || 0;

      this.props.addTask(this.state.description, minutes, seconds);
    }
  };

  render() {
    return (
      <form className="new-todo-form" onKeyDown={this.onKeyDown}>
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          value={this.state.description}
          onChange={this.ondescriptionChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.minutes}
          onChange={this.onMinChange}
          type="number"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.seconds}
          onChange={this.onSecChange}
          type="number"
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};
