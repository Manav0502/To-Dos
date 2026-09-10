const Task = require('../models/taskModel');

const getAllTasks = async () => {
  return await Task.find();
};

const createTask = async (text) => {
  return await Task.create({ text });
};

const updateTask = async (id, updateData) => {
  return await Task.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};