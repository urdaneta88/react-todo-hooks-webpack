import React, { useContext } from 'react';
import Todo from './Todo';
import { TodoAppContext } from '#Root/App';

function Todos(props) {
  const { todoList, handleRemoveItem } = props;
  const theme = useContext(TodoAppContext);

  return (
    <ul className={theme.mode}>
      {todoList.map(todo => (
        <Todo
          {...todo}
          handleRemoveItem={() => {
            handleRemoveItem(todo.id);
          }}
          key={todo.id}
        />
      ))}
    </ul>
  );
}

export default Todos;
