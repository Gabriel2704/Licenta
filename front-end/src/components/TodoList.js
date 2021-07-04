import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { taskRoute } from '../axios/routes';
import { postTask } from '../axios/controllers';

function TodoList({ eveniment, taskuri }) {
  let tasks = [];
  for (let i = 0; i < taskuri.length; i++) {
    tasks[i] = taskuri[i];
  }

  const [todos, setTodos] = useState(tasks);

  const addTodo = async todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      if (!todo.number) {
        return;
      }
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    try {
      await postTask(taskRoute, { description: todo.text, priority: todo.number, idEv: eveniment.id });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      if (!newValue.number) {
        return;
      }
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
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
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;