import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { formatDistanceToNow } from 'date-fns';

import Header from '../components/Header';
import TaskList from '../components/TaskList';
import Footer from '../components/Footer';

const App = () => {
  const maxId = useRef(100);

  const [taskData, setTaskData] = useState([]);
  const [filterSelected, setFilterSelected] = useState('btn-all');

  useEffect(() => {
    const initialTasks = [
      createTodoTask('Поесть', 30, 0),
      createTodoTask('Запустить Жука', 0, 5),
      createTodoTask('Купить салфетки', 15, 21),
    ];
    setTaskData(initialTasks);
  }, []);

  const toggleFilter = (filter) => {
    setFilterSelected(filter);
  };

  const createTodoTask = (description, min, sec) => {
    maxId.current += 1;
    return {
      taskClass: null,
      description,
      createdAt: new Date(),
      done: false,
      id: maxId.current,
      min,
      sec,
      isRunning: false,
      timerId: null,
    };
  };

  const updateTaskData = (id, updateFn) => {
    setTaskData((prevTaskData) => {
      const index = prevTaskData.findIndex((el) => el.id === id);
      if (index === -1) return;

      const oldItem = prevTaskData[index];
      const newItem = updateFn(oldItem);

      const newArr = [...prevTaskData.slice(0, index), newItem, ...prevTaskData.slice(index + 1)];

      return newArr;
    });
  };

  const addTask = (text, min, sec) => {
    const newItem = createTodoTask(text, min, sec);

    setTaskData((prevTaskData) => {
      const newArr = [...prevTaskData, newItem];
      return newArr;
    });
  };

  const handleCheckboxChange = (id) => {
    updateTaskData(id, (oldItem) => ({
      ...oldItem,
      done: !oldItem.done,
      taskClass: oldItem.done ? null : 'completed',
    }));
  };

  const editItem = (id) => {
    updateTaskData(id, (oldItem) => ({
      ...oldItem,
      taskClass: 'editing',
    }));
  };

  const onEditDescription = (id, value) => {
    updateTaskData(id, (oldItem) => ({
      ...oldItem,
      description: value,
    }));
  };

  const onSave = (id, key) => {
    if (key === 'Enter') {
      updateTaskData(id, (oldItem) => ({
        ...oldItem,
        taskClass: oldItem.done ? 'completed' : null,
      }));
    }
  };

  const deletItem = (id) => {
    setTaskData((prevTaskData) => {
      const index = prevTaskData.findIndex((el) => el.id === id);
      if (index === -1) return;

      const newArr = [...prevTaskData.slice(0, index), ...prevTaskData.slice(index + 1)];

      return newArr;
    });
  };

  const deletCompletedTask = () => {
    const activeTasks = taskData.filter((task) => task.done !== true);
    setTaskData(activeTasks);
  };

  const stopTimer = (id) => {
    setTaskData((prevTaskData) => {
      const task = prevTaskData.find((t) => t.id === id);
      if (task?.timerId) clearInterval(task.timerId);

      return prevTaskData.map((t) => (t.id === id ? { ...t, isRunning: false, timerId: null } : t));
    });
  };

  const startTimer = (id) => {
    setTaskData((prevTaskData) => {
      const task = prevTaskData.find((t) => t.id === id);
      if (!task || task.isRunning) return null;

      const timerId = setInterval(() => {
        setTaskData((prevTaskData) => {
          return prevTaskData.map((t) => {
            if (t.id !== id) return t;

            if (t.min === 0 && t.sec === 0) {
              clearInterval(t.timerId);
              return { ...t, isRunning: false, timerId: null };
            }

            let newSec = t.sec === 0 ? 59 : t.sec - 1;
            let newMin = t.sec === 0 && t.min > 0 ? t.min - 1 : t.min;

            if (newMin < 0) newMin = 0;

            return { ...t, min: newMin, sec: newSec };
          });
        });
      }, 1000);

      return prevTaskData.map((t) => (t.id === id ? { ...t, isRunning: true, timerId } : t));
    });
  };

  const tasksWithFormattedTime = taskData.map((task) => ({
    ...task,
    created: `created ${formatDistanceToNow(task.createdAt, { includeSeconds: true })} ago`,
  }));

  const filteredTasks = tasksWithFormattedTime.filter((task) => {
    if (filterSelected === 'btn-all') return true;
    if (filterSelected === 'btn-active') return !task.done;
    if (filterSelected === 'btn-completed') return task.done;
    return true;
  });

  const activeCount = tasksWithFormattedTime.filter((task) => task.done === false).length;

  return (
    <section
      className="todoapp"
      onClick={(e) => {
        if (e.target.name !== 'edit' || !e.target.name) {
          const editingTask = taskData.find((task) => task.taskClass === 'editing');
          if (editingTask) {
            onSave(editingTask.id, 'Enter');
          }
        }
      }}
    >
      <Header addTask={addTask} />
      <section className="main">
        <TaskList
          taskData={filteredTasks}
          onCheckboxChange={handleCheckboxChange}
          onDeleted={deletItem}
          onEdit={editItem}
          onEditDescription={onEditDescription}
          onSave={onSave}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          filterSelected={filterSelected}
          toggleFilter={toggleFilter}
          deletCompletedTask={deletCompletedTask}
          activeCount={activeCount}
        />
      </section>
    </section>
  );
};

export default App;
