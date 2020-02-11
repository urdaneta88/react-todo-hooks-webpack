import React, { useState } from 'react';

function TodoInput(props) {
  const [todoInput, setTodoInput] = useState('');
  const { handleAddTodo } = props;

  return (
    <input
      placeholder="ex. drink milk"
      value={todoInput}
      onChange={e => {
        setTodoInput(e.target.value);
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handleAddTodo({ id: new Date().getTime(), value: todoInput });
          setTodoInput('');
        }
      }}
    />
  );
}

export default TodoInput;
