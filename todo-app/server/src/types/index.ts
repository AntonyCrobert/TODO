/**
 * Type definitions for the ToDo application
 */

/**
 * Task interface representing a single task
 */
export interface Task {
  id: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * TaskList interface representing a collection of tasks
 */
export interface TaskList {
  id: string;
  title: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Filter status for task lists
 */
export enum FilterStatus {
  ALL = 'all',
  COMPLETED = 'completed',
  PENDING = 'pending'
}

/**
 * Response structure for API endpoints
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Data structure for storing task lists in JSON file
 */
export interface DataStore {
  taskLists: TaskList[];
}
