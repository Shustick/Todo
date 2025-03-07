import React, { Component } from 'react';
import './App.css';
import { formatDistanceToNow } from 'date-fns';

import Header from '../components/Header';
import TaskList from '../components/TaskList';
import Footer from '../components/Footer';

export default class App extends Component {
  maxId = 100;

  state = {
    taskData: [this.createTodoTask('Притиер'), this.createTodoTask('Линтер'), this.createTodoTask('Хаски??')],
    filterSelected: 'btn-all',
  };

  toggleFilter = (filter) => {
    this.setState({ filterSelected: filter });
  };

  createTodoTask(description) {
    return {
      taskClass: null,
      description,
      createdAt: new Date(),
      done: false,
      id: this.maxId++,
    };
  }

  updateTaskData = (id, updateFn) => {
    this.setState(({ taskData }) => {
      const index = taskData.findIndex((el) => el.id === id);
      if (index === -1) return;

      const oldItem = taskData[index];
      const newItem = updateFn(oldItem);

      const newArr = [...taskData.slice(0, index), newItem, ...taskData.slice(index + 1)];

      return { taskData: newArr };
    });
  };

  addTask = (text) => {
    const newItem = this.createTodoTask(text);

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newItem];
      return {
        taskData: newArr,
      };
    });
  };

  handleCheckboxChange = (id) => {
    this.updateTaskData(id, (oldItem) => ({
      ...oldItem,
      done: !oldItem.done,
      taskClass: oldItem.done ? null : 'completed',
    }));
  };

  editItem = (id) => {
    this.updateTaskData(id, (oldItem) => ({
      ...oldItem,
      taskClass: 'editing',
    }));
  };

  onEditDescription = (id, value) => {
    this.updateTaskData(id, (oldItem) => ({
      ...oldItem,
      description: value,
    }));
  };

  onSave = (id, key) => {
    if (key === 'Enter') {
      this.updateTaskData(id, (oldItem) => ({
        ...oldItem,
        taskClass: oldItem.done ? 'completed' : null,
      }));
    }
  };

  deletItem = (id) => {
    this.setState(({ taskData }) => {
      const index = taskData.findIndex((el) => el.id === id);
      if (index === -1) return;

      const newArr = [...taskData.slice(0, index), ...taskData.slice(index + 1)];

      return { taskData: newArr };
    });
  };

  deletCompletedTask = () => {
    const activeTasks = this.state.taskData.filter((task) => task.done !== true);
    this.setState({ taskData: activeTasks });
  };

  render() {
    const tasksWithFormattedTime = this.state.taskData.map((task) => ({
      ...task,
      created: `created ${formatDistanceToNow(task.createdAt, { includeSeconds: true })} ago`,
    }));

    const filteredTasks = tasksWithFormattedTime.filter((task) => {
      if (this.state.filterSelected === 'btn-all') return true;
      if (this.state.filterSelected === 'btn-active') return !task.done;
      if (this.state.filterSelected === 'btn-completed') return task.done;
      return true;
    });

    const activeCount = tasksWithFormattedTime.filter((task) => task.done === false).length;

    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <section className="main">
          <TaskList
            taskData={filteredTasks}
            onCheckboxChange={this.handleCheckboxChange}
            onDeleted={this.deletItem}
            onEdit={this.editItem}
            onEditDescription={this.onEditDescription}
            onSave={this.onSave}
          />
          <Footer
            filterSelected={this.state.filterSelected}
            toggleFilter={this.toggleFilter}
            deletCompletedTask={this.deletCompletedTask}
            activeCount={activeCount}
          />
        </section>
      </section>
    );
  }
}
