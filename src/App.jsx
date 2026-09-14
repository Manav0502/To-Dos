import { useState, useEffect } from 'react';
import { TodoProvider } from './contexts';
import { TodoForm, TodoItem } from './components';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://to-dos-v5r1.onrender.com/' 
  : 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = async (todoData) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoData)
    });
    const newTodo = await res.json();
    setTodos((prev) => [newTodo, ...prev]);
  };

  const updateTodo = async (id, updatedData) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: updatedData.todo })
    });
    const updated = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = async (id) => {
    const res = await fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' });
    const updated = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

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