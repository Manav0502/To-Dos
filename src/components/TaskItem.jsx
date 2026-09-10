import { useState } from 'react';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(task.id, editText);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-3 border-b border-gray-200 bg-white rounded mb-2 shadow-sm">
      <div className="flex items-center gap-3 flex-1 mr-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4 text-blue-600 rounded"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="p-1 border border-gray-300 rounded flex-1"
          />
        ) : (
          <span className={task.completed ? "line-through text-gray-400 flex-1" : "text-gray-800 flex-1"}>
            {task.text}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
}