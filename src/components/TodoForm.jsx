import React, { useState } from 'react';
import { useTodo } from '../contexts';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    addTodo({ todo, completed: false });
    setTodo('');
  };

  return (
    <form onSubmit={add} className="flex border border-teal-900/60 rounded-xl overflow-hidden bg-slate-900/80 shadow-lg">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full bg-transparent px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 text-sm sm:text-base"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold px-6 py-3 transition-colors duration-200 shrink-0 text-sm sm:text-base"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;