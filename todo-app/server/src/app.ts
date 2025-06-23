import express from 'express';
import cors from 'cors';
import taskListRouter from './routes/task-list.routes';

/**
 * Express application setup
 */
export const createApp = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api/tasklists', taskListRouter);

  // Root route
  app.get('/', (req, res) => {
    res.json({
      message: 'ToDo API Server',
      endpoints: {
        taskLists: '/api/tasklists',
        taskListById: '/api/tasklists/:id',
        createTaskList: '/api/tasklists',
        updateTaskList: '/api/tasklists/:id',
        deleteTaskList: '/api/tasklists/:id',
        filterTaskLists: '/api/tasklists/filter/:status',
        addTask: '/api/tasklists/:id/tasks',
        updateTask: '/api/tasklists/:listId/tasks/:taskId',
        deleteTask: '/api/tasklists/:listId/tasks/:taskId',
        toggleTaskCompletion: '/api/tasklists/:listId/tasks/:taskId/toggle'
      }
    });
  });

  // Error handling middleware
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  });

  return app;
};
