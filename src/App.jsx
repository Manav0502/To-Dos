import { useState } from 'react';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: true },
    { id: 2, text: 'Task 2', completed: false }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          To-Do List
        </h1>
        <TaskForm onAddTask={handleAddTask} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </div>
  );
}