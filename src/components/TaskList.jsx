import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500 my-4">No tasks found.</p>;
  }

  return (
    <ul className="w-full">
      {tasks.map((task) => {
        const taskId = task._id || task.id;
        return (
          <TaskItem
            key={taskId}
            task={{ ...task, id: taskId }}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        );
      })}
    </ul>
  );
}