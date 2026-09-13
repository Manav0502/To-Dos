import React, { useState } from 'react';
import { useTodo } from '../contexts';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center border rounded-xl px-4 py-2.5 gap-x-3 shadow-sm transition-all duration-200 ${
        todo.completed 
          ? 'bg-emerald-950/40 border-emerald-800/40' 
          : 'bg-teal-950/30 border-teal-900/40'
      }`}
    >
      <input
        type="checkbox"
        className="w-4 h-4 cursor-pointer accent-teal-400 rounded"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`w-full bg-transparent outline-none rounded-lg px-2 py-1 text-sm sm:text-base transition ${
          isTodoEditable ? 'border border-teal-500/40 bg-slate-900/60 text-slate-100' : 'border-transparent'
        } ${todo.completed ? 'line-through text-emerald-400/60' : 'text-slate-200'}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-slate-700/60 justify-center items-center bg-slate-800/60 hover:bg-slate-700/60 disabled:opacity-40 text-amber-300 shrink-0 transition"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? '📁' : '✏️'}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-slate-700/60 justify-center items-center bg-slate-800/60 hover:bg-rose-950/60 text-rose-400 shrink-0 transition"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;