import { v4 as uuidv4 } from 'uuid';
import { dataService } from './data.service';
import { Task, TaskList, FilterStatus } from '../types';

/**
 * Service for handling task list operations
 */
export class TaskListService {
  /**
   * Get all task lists
   * @returns Array of all task lists
   */
  getAllTaskLists(): TaskList[] {
    return dataService.getAllTaskLists();
  }

  /**
   * Get a task list by ID
   * @param id - The ID of the task list to get
   * @returns The task list with the specified ID, or undefined if not found
   */
  getTaskListById(id: string): TaskList | undefined {
    return dataService.getTaskListById(id);
  }

  /**
   * Create a new task list
   * @param title - The title of the task list
   * @returns The created task list
   */
  createTaskList(title: string): TaskList {
    const now = new Date();
    const newTaskList: TaskList = {
      id: uuidv4(),
      title,
      tasks: [],
      createdAt: now,
      updatedAt: now
    };
    
    return dataService.saveTaskList(newTaskList);
  }

  /**
   * Update a task list
   * @param id - The ID of the task list to update
   * @param title - The new title for the task list
   * @returns The updated task list, or undefined if not found
   */
  updateTaskList(id: string, title: string): TaskList | undefined {
    const taskList = this.getTaskListById(id);
    
    if (!taskList) {
      return undefined;
    }
    
    taskList.title = title;
    taskList.updatedAt = new Date();
    
    return dataService.saveTaskList(taskList);
  }

  /**
   * Delete a task list
   * @param id - The ID of the task list to delete
   * @returns True if the task list was deleted, false otherwise
   */
  deleteTaskList(id: string): boolean {
    return dataService.deleteTaskList(id);
  }

  /**
   * Add a task to a task list
   * @param taskListId - The ID of the task list to add the task to
   * @param description - The description of the task
   * @returns The updated task list, or undefined if not found
   */
  addTask(taskListId: string, description: string): TaskList | undefined {
    const taskList = this.getTaskListById(taskListId);
    
    if (!taskList) {
      return undefined;
    }
    
    const now = new Date();
    const newTask: Task = {
      id: uuidv4(),
      description,
      completed: false,
      createdAt: now,
      updatedAt: now
    };
    
    taskList.tasks.push(newTask);
    taskList.updatedAt = now;
    
    return dataService.saveTaskList(taskList);
  }

  /**
   * Update a task in a task list
   * @param taskListId - The ID of the task list containing the task
   * @param taskId - The ID of the task to update
   * @param description - The new description for the task
   * @returns The updated task list, or undefined if not found
   */
  updateTask(taskListId: string, taskId: string, description: string): TaskList | undefined {
    const taskList = this.getTaskListById(taskListId);
    
    if (!taskList) {
      return undefined;
    }
    
    const taskIndex = taskList.tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return undefined;
    }
    
    taskList.tasks[taskIndex].description = description;
    taskList.tasks[taskIndex].updatedAt = new Date();
    taskList.updatedAt = new Date();
    
    return dataService.saveTaskList(taskList);
  }

  /**
   * Delete a task from a task list
   * @param taskListId - The ID of the task list containing the task
   * @param taskId - The ID of the task to delete
   * @returns The updated task list, or undefined if not found
   */
  deleteTask(taskListId: string, taskId: string): TaskList | undefined {
    const taskList = this.getTaskListById(taskListId);
    
    if (!taskList) {
      return undefined;
    }
    
    const initialLength = taskList.tasks.length;
    taskList.tasks = taskList.tasks.filter(task => task.id !== taskId);
    
    if (taskList.tasks.length === initialLength) {
      return undefined;
    }
    
    taskList.updatedAt = new Date();
    
    return dataService.saveTaskList(taskList);
  }

  /**
   * Toggle the completion status of a task
   * @param taskListId - The ID of the task list containing the task
   * @param taskId - The ID of the task to toggle
   * @returns The updated task list, or undefined if not found
   */
  toggleTaskCompletion(taskListId: string, taskId: string): TaskList | undefined {
    const taskList = this.getTaskListById(taskListId);
    
    if (!taskList) {
      return undefined;
    }
    
    const taskIndex = taskList.tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return undefined;
    }
    
    taskList.tasks[taskIndex].completed = !taskList.tasks[taskIndex].completed;
    taskList.tasks[taskIndex].updatedAt = new Date();
    taskList.updatedAt = new Date();
    
    return dataService.saveTaskList(taskList);
  }

  /**
   * Filter task lists by status (all, completed, pending)
   * @param status - The status to filter by
   * @returns Array of filtered task lists
   */
  filterTaskListsByStatus(status: FilterStatus): TaskList[] {
    return dataService.filterTaskListsByStatus(status);
  }

  /**
   * Check if a task list is completed (all tasks are completed)
   * @param taskList - The task list to check
   * @returns True if all tasks in the list are completed, false otherwise
   */
  isTaskListCompleted(taskList: TaskList): boolean {
    return taskList.tasks.length > 0 && taskList.tasks.every(task => task.completed);
  }
}

// Export a singleton instance of TaskListService
export const taskListService = new TaskListService();
