import { Request, Response } from 'express';
import { taskListService } from '../services/task-list.service';
import { FilterStatus } from '../types';

/**
 * Controller for handling task list operations
 */
export class TaskListController {
  /**
   * Get all task lists
   * @param req - Express request object
   * @param res - Express response object
   */
  getAllTaskLists(req: Request, res: Response): void {
    try {
      const taskLists = taskListService.getAllTaskLists();
      res.status(200).json({
        success: true,
        data: taskLists
      });
    } catch (error) {
      console.error('Error getting all task lists:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get task lists'
      });
    }
  }

  /**
   * Get a task list by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  getTaskListById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const taskList = taskListService.getTaskListById(id);
      
      if (!taskList) {
        res.status(404).json({
          success: false,
          error: `Task list with ID ${id} not found`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: taskList
      });
    } catch (error) {
      console.error('Error getting task list by ID:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get task list'
      });
    }
  }

  /**
   * Create a new task list
   * @param req - Express request object
   * @param res - Express response object
   */
  createTaskList(req: Request, res: Response): void {
    try {
      const { title } = req.body;
      
      if (!title) {
        res.status(400).json({
          success: false,
          error: 'Title is required'
        });
        return;
      }
      
      const newTaskList = taskListService.createTaskList(title);
      
      res.status(201).json({
        success: true,
        data: newTaskList
      });
    } catch (error) {
      console.error('Error creating task list:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create task list'
      });
    }
  }

  /**
   * Update a task list
   * @param req - Express request object
   * @param res - Express response object
   */
  updateTaskList(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const { title } = req.body;
      
      if (!title) {
        res.status(400).json({
          success: false,
          error: 'Title is required'
        });
        return;
      }
      
      const updatedTaskList = taskListService.updateTaskList(id, title);
      
      if (!updatedTaskList) {
        res.status(404).json({
          success: false,
          error: `Task list with ID ${id} not found`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: updatedTaskList
      });
    } catch (error) {
      console.error('Error updating task list:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update task list'
      });
    }
  }

  /**
   * Delete a task list
   * @param req - Express request object
   * @param res - Express response object
   */
  deleteTaskList(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const deleted = taskListService.deleteTaskList(id);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          error: `Task list with ID ${id} not found`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: { message: `Task list with ID ${id} deleted successfully` }
      });
    } catch (error) {
      console.error('Error deleting task list:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete task list'
      });
    }
  }

  /**
   * Filter task lists by status
   * @param req - Express request object
   * @param res - Express response object
   */
  filterTaskLists(req: Request, res: Response): void {
    try {
      const { status } = req.params;
      
      if (!Object.values(FilterStatus).includes(status as FilterStatus)) {
        res.status(400).json({
          success: false,
          error: `Invalid status: ${status}. Must be one of: ${Object.values(FilterStatus).join(', ')}`
        });
        return;
      }
      
      const filteredTaskLists = taskListService.filterTaskListsByStatus(status as FilterStatus);
      
      res.status(200).json({
        success: true,
        data: filteredTaskLists
      });
    } catch (error) {
      console.error('Error filtering task lists:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to filter task lists'
      });
    }
  }

  /**
   * Add a task to a task list
   * @param req - Express request object
   * @param res - Express response object
   */
  addTask(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const { description } = req.body;
      
      if (!description) {
        res.status(400).json({
          success: false,
          error: 'Description is required'
        });
        return;
      }
      
      const updatedTaskList = taskListService.addTask(id, description);
      
      if (!updatedTaskList) {
        res.status(404).json({
          success: false,
          error: `Task list with ID ${id} not found`
        });
        return;
      }
      
      res.status(201).json({
        success: true,
        data: updatedTaskList
      });
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to add task'
      });
    }
  }

  /**
   * Update a task in a task list
   * @param req - Express request object
   * @param res - Express response object
   */
  updateTask(req: Request, res: Response): void {
    try {
      const { listId, taskId } = req.params;
      const { description } = req.body;
      
      if (!description) {
        res.status(400).json({
          success: false,
          error: 'Description is required'
        });
        return;
      }
      
      const updatedTaskList = taskListService.updateTask(listId, taskId, description);
      
      if (!updatedTaskList) {
        res.status(404).json({
          success: false,
          error: `Task list with ID ${listId} or task with ID ${taskId} not found`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: updatedTaskList
      });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update task'
      });
    }
  }

  /**
   * Delete a task from a task list
   * @param req - Express request object
   * @param res - Express response object
   */
  deleteTask(req: Request, res: Response): void {
    try {
      const { listId, taskId } = req.params;
      const updatedTaskList = taskListService.deleteTask(listId, taskId);
      
      if (!updatedTaskList) {
        res.status(404).json({
          success: false,
          error: `Task list with ID ${listId} or task with ID ${taskId} not found`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: updatedTaskList
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete task'
      });
    }
  }

  /**
   * Toggle the completion status of a task
   * @param req - Express request object
   * @param res - Express response object
   */
  toggleTaskCompletion(req: Request, res: Response): void {
    try {
      const { listId, taskId } = req.params;
      const updatedTaskList = taskListService.toggleTaskCompletion(listId, taskId);
      
      if (!updatedTaskList) {
        res.status(404).json({
          success: false,
          error: `Task list with ID ${listId} or task with ID ${taskId} not found`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: updatedTaskList
      });
    } catch (error) {
      console.error('Error toggling task completion:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to toggle task completion'
      });
    }
  }
}

// Export a singleton instance of TaskListController
export const taskListController = new TaskListController();
