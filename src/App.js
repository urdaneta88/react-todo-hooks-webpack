import React, { useReducer, useEffect, useState, createContext } from 'react';
import ReactDOM from 'react-dom';
import TodoInput from '#Components/Todos/Todoinput';
import Todos from '#Components/Todos/Todos';
import '#Styles/style.css';

export const TodoAppContext = createContext('');

function App() {
  const [themeMode, setThemeMode] = useState({ mode: 'day' });
  const [todos, dispatch] = useReducer((state, action) => {
    if (action.type === 'add') {
      if (state) {
        state = [...state, action.value];
      } else state = [action.value];
    } else if (action.type === 'remove') {
      const newTodos = state.filter(todo => todo.id !== action.value);
      state = [...newTodos];
    }

    localStorage.setItem('todos', JSON.stringify(state));
    return state;
  }, JSON.parse(localStorage.getItem('todos')) || []);

  useEffect(() => {
    document.title = `${todos.length} Todos`;
    return () => {
      localStorage.removeItem('todos');
    };
  }, [todos]);

  const handleRemoveItem = id => {
    dispatch({ type: 'remove', value: id });
  };

  const handleAddTodo = todo => {
    dispatch({ type: 'add', value: todo });
  };

  return (
    <TodoAppContext.Provider value={themeMode}>
      <div className={'App ' + themeMode.mode}>
        <h1>
          Todo App React Hooks{' '}
          <button
            onClick={() => {
              setThemeMode(
                themeMode.mode === 'day' ? { mode: 'night' } : { mode: 'day' }
              );
            }}
          >
            {themeMode.mode === 'day' ? 'night' : 'day'}
          </button>
        </h1>
        <label>
          Add new todo: <TodoInput handleAddTodo={handleAddTodo} />
        </label>
        <div>
          <Todos todoList={todos} handleRemoveItem={handleRemoveItem} />
        </div>
      </div>
    </TodoAppContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
