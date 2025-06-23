import { Router } from 'express';
import { taskListController } from '../controllers/task-list.controller';

// Create a router for task list routes
const taskListRouter = Router();

// Task list routes
taskListRouter.get('/', taskListController.getAllTaskLists);
taskListRouter.post('/', taskListController.createTaskList);
taskListRouter.get('/filter/:status', taskListController.filterTaskLists);
taskListRouter.get('/:id', taskListController.getTaskListById);
taskListRouter.put('/:id', taskListController.updateTaskList);
taskListRouter.delete('/:id', taskListController.deleteTaskList);

// Task routes
taskListRouter.post('/:id/tasks', taskListController.addTask);
taskListRouter.put('/:listId/tasks/:taskId', taskListController.updateTask);
taskListRouter.delete('/:listId/tasks/:taskId', taskListController.deleteTask);
taskListRouter.patch('/:listId/tasks/:taskId/toggle', taskListController.toggleTaskCompletion);

export default taskListRouter;
