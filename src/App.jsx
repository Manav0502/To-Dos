import { useState, useEffect } from 'react';
import { TodoProvider } from './contexts';
import { TodoForm, TodoItem } from './components';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#050b14] min-h-screen py-12 px-4 font-sans text-slate-100">
        <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl bg-slate-900/90 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-md">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 tracking-wide text-teal-400">
            Manage Your Todos
          </h1>
          <div className="mb-6">
            <TodoForm />
          </div>
          <div className="flex flex-col gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;