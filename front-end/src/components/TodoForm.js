import React, { useState } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [inputN, setInputN] = useState(props.edit ? props.edit.value : '');

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleChangeN = e => {
    setInputN(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      description: input,
      priority: inputN
    });
    
    setInput('');
    setInputN('');
    window.location.reload(false);
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='description'
            className='todo-input edit'
          />
          <input
            placeholder='Add a priority'
            value={inputN}
            onChange={handleChangeN}
            name='priority'
            className='todo-input edit'
            type='number'
            max='5'
            min='1'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='description'
            className='todo-input'
          />
          <input
            placeholder='Add a priority'
            value={inputN}
            onChange={handleChangeN}
            name='priority'
            className='todo-input'
            type='number'
            max='5'
            min='1'
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;