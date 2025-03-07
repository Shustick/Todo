import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    discription: '',
  };

  ondiscriptionChange = (e) => {
    this.setState({
      discription: e.target.value,
    });
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        discription: '',
      });
      this.props.addTask(this.state.discription);
    }
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={this.state.discription}
        onChange={this.ondiscriptionChange}
        onKeyDown={this.onKeyDown}
      />
    );
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};
