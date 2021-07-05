import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    number: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);

    window.location.reload(false);

    setEdit({
      id: null,
      value: '',
      number: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={
        todo.isComplete ?
          todo.priority === '1'
            ? 'todo-row complete green-1' : todo.priority === '2'
              ? 'todo-row complete green-2' : todo.priority === '3'
                ? 'todo-row complete yellow' : todo.priority === '4'
                  ? 'todo-row complete red-1' : 'todo-row complete red-2'
          :
          todo.priority === '1'
            ? 'todo-row green-1' : todo.priority === '2'
              ? 'todo-row green-2' : todo.priority === '3'
                ? 'todo-row yellow' : todo.priority === '4'
                  ? 'todo-row red-1' : 'todo-row red-2'
      }
      key={index}
    >
      <div
        key={todo.id}
        onClick={() => completeTodo(todo.id)}
      >
        {todo.description}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.description })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;