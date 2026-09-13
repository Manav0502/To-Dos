import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import TaskList from './components/TaskList';

const API_URL = '/api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (text) => {
    try {
      const response = await axios.post(API_URL, { text });
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleToggleTask = async (id) => {
    const taskToToggle = tasks.find((t) => (t._id || t.id) === id);
    if (!taskToToggle) return;
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !taskToToggle.completed,
      });
      setTasks(
        tasks.map((t) => ((t._id || t.id) === id ? response.data : t))
      );
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => (t._id || t.id) !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleEditTask = async (id, newText) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        text: newText,
      });
      setTasks(
        tasks.map((t) => ((t._id || t.id) === id ? response.data : t))
      );
    } catch (err) {
      setError('Failed to edit task');
    }
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
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}
        <TaskForm onAddTask={handleAddTask} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {loading ? (
          <p className="text-center text-gray-500 my-4">Loading tasks...</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        )}
      </div>
    </div>
  );
}