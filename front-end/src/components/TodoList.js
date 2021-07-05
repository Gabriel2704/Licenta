import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { taskRoute } from '../axios/routes';
import { deleteTask, postTask, updateTask } from '../axios/controllers';

function TodoList({ eveniment, taskuri }) {
  const [todos, setTodos] = useState([]);

  const addTodo = async todo => {
    if (!todo.description || /^\s*$/.test(todo.description)) {
      if (!todo.priority) {
        return;
      }
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    try {
      await postTask(taskRoute, { description: todo.description, priority: todo.priority, idEv: eveniment.id });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.description || /^\s*$/.test(newValue.description)) {
      if (!newValue.priority) {
        return;
      }
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    
    try {
      updateTask(taskRoute, { description: newValue.description, priority: newValue.priority }, todoId);
    }
    catch (err) {
      console.log(err);
    }
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);

    try {
      deleteTask(taskRoute, id);
    } catch (err) {
      console.log(err);
    }
    window.location.reload(false);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1 style={{ color: "white" }}>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={taskuri}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;