import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { todo } = req.body;
  if (!todo) {
    return res.status(400).json({ error: 'Todo content is required' });
  }
  const newTodo = {
    id: Date.now().toString(),
    todo,
    completed: false
  };
  todos.unshift(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[index].todo = todo;
  res.json(todos[index]);
});

app.patch('/api/todos/:id/toggle', (req, res) => {
  const { id } = req.params;
  const item = todos.find((t) => t.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  item.completed = !item.completed;
  res.json(item);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== id);
  res.json({ success: true, message: 'Todo deleted successfully', id });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});