
import './../styles/App.css';
import React, { useState, useMemo } from 'react';

// Utility: Generate 50 tasks
const generateTodos = () => {
  const todos = [];
  for (let i = 1; i <= 50; i++) {
    todos.push({
      id: i,
      name: `Task ${i}`,
      completed: i <= 25, // First 25 are completed
    });
  }
  return todos;
};

// Artificially slow rendering
const slowDown = (ms) => {
  const startTime = performance.now();
  while (performance.now() - startTime < ms) {}
};

const App = () => {
  const todos = useMemo(() => generateTodos(), []);

  const [tab, setTab] = useState('All');
  const [darkMode, setDarkMode] = useState(false);

  const filteredTodos = useMemo(() => {
    console.log('Filtering...');
    if (tab === 'Active') {
      return todos.filter((todo) => !todo.completed);
    } else if (tab === 'Completed') {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [tab, todos]);

  return (
    <div className={`main ${darkMode ? 'dark' : ''}`}>
      <h2>Todo App with Filters & Dark Mode</h2>

      <button onClick={() => setDarkMode((prev) => !prev)}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      <div className="buttons-container">
        <button onClick={() => setTab('All')}>All</button>
        <button onClick={() => setTab('Active')}>Active</button>
        <button onClick={() => setTab('Completed')}>Completed</button>
      </div>

      <div className="list-container">
        <p><strong>Note: List is artificially slowed down!</strong></p>
        <ul>
          {filteredTodos.map((todo) => {
            slowDown(5);
            return <li key={todo.id}>{todo.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
