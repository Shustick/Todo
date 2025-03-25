import React, { Component } from 'react';
import './App.css';
import { formatDistanceToNow } from 'date-fns';

import Header from '../components/Header';
import TaskList from '../components/TaskList';
import Footer from '../components/Footer';

export default class App extends Component {
  maxId = 100;

  state = {
    taskData: [
      this.createTodoTask('Поесть', 30, 0),
      this.createTodoTask('Запустить Жука', 0, 5),
      this.createTodoTask('Купить салфетки', 15, 21),
    ],
    filterSelected: 'btn-all',
  };

  toggleFilter = (filter) => {
    this.setState({ filterSelected: filter });
  };

  createTodoTask(description, min, sec) {
    return {
      taskClass: null,
      description,
      createdAt: new Date(),
      done: false,
      id: this.maxId++,
      min,
      sec,
      isRunning: false,
      timerId: null,
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

  addTask = (text, min, sec) => {
    const newItem = this.createTodoTask(text, min, sec);

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

  stopTimer = (id) => {
    this.setState(({ taskData }) => {
      const task = taskData.find((t) => t.id === id);
      if (task?.timerId) clearInterval(task.timerId);

      return {
        taskData: taskData.map((t) => (t.id === id ? { ...t, isRunning: false, timerId: null } : t)),
      };
    });
  };

  startTimer = (id) => {
    this.setState(({ taskData }) => {
      const task = taskData.find((t) => t.id === id);
      if (!task || task.isRunning) return null;

      const timerId = setInterval(() => {
        this.setState(({ taskData }) => {
          return {
            taskData: taskData.map((t) => {
              if (t.id !== id) return t;

              if (t.min === 0 && t.sec === 0) {
                clearInterval(t.timerId);
                return { ...t, isRunning: false, timerId: null };
              }

              let newSec = t.sec === 0 ? 59 : t.sec - 1;
              let newMin = t.sec === 0 && t.min > 0 ? t.min - 1 : t.min;

              if (newMin < 0) newMin = 0;

              return { ...t, min: newMin, sec: newSec };
            }),
          };
        });
      }, 1000);

      return {
        taskData: taskData.map((t) => (t.id === id ? { ...t, isRunning: true, timerId } : t)),
      };
    });
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
      <section
        className="todoapp"
        onClick={(e) => {
          if (e.target.name !== 'edit' || !e.target.name) {
            const editingTask = this.state.taskData.find((task) => task.taskClass === 'editing');
            if (editingTask) {
              this.onSave(editingTask.id, 'Enter');
            }
          }
        }}
      >
        <Header addTask={this.addTask} />
        <section className="main">
          <TaskList
            taskData={filteredTasks}
            onCheckboxChange={this.handleCheckboxChange}
            onDeleted={this.deletItem}
            onEdit={this.editItem}
            onEditDescription={this.onEditDescription}
            onTimer={this.onTimer}
            onSave={this.onSave}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
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
