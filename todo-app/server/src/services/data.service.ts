import fs from 'fs';
import path from 'path';
import { CONFIG } from '../config/paths';
import { DataStore, TaskList } from '../types';

/**
 * Service for handling data persistence using a JSON file
 */
export class DataService {
  private dataFilePath: string;
  private defaultData: DataStore = { taskLists: [] };

  /**
   * Constructor for DataService
   * @param dataFileName - Name of the JSON file to store data
   */
  constructor(dataFileName: string = 'todo-data.json') {
    this.dataFilePath = path.join(CONFIG.DATA_DIR, dataFileName);
    this.initDataFile();
  }

  /**
   * Initialize the data file if it doesn't exist
   */
  private initDataFile(): void {
    const dataDir = path.dirname(this.dataFilePath);
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Create data file with default structure if it doesn't exist
    if (!fs.existsSync(this.dataFilePath)) {
      this.writeData(this.defaultData);
    }
  }

  /**
   * Read data from the JSON file
   * @returns The data from the JSON file
   */
  readData(): DataStore {
    try {
      const data = fs.readFileSync(this.dataFilePath, 'utf8');
      return JSON.parse(data) as DataStore;
    } catch (error) {
      console.error('Error reading data file:', error);
      return this.defaultData;
    }
  }

  /**
   * Write data to the JSON file
   * @param data - The data to write to the JSON file
   */
  writeData(data: DataStore): void {
    try {
      fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing to data file:', error);
      throw new Error('Failed to write data to file');
    }
  }

  /**
   * Get all task lists
   * @returns Array of all task lists
   */
  getAllTaskLists(): TaskList[] {
    const data = this.readData();
    return data.taskLists;
  }

  /**
   * Get a task list by ID
   * @param id - The ID of the task list to get
   * @returns The task list with the specified ID, or undefined if not found
   */
  getTaskListById(id: string): TaskList | undefined {
    const data = this.readData();
    return data.taskLists.find(taskList => taskList.id === id);
  }

  /**
   * Save a task list (create or update)
   * @param taskList - The task list to save
   * @returns The saved task list
   */
  saveTaskList(taskList: TaskList): TaskList {
    const data = this.readData();
    const existingIndex = data.taskLists.findIndex(tl => tl.id === taskList.id);
    
    if (existingIndex >= 0) {
      // Update existing task list
      data.taskLists[existingIndex] = taskList;
    } else {
      // Add new task list
      data.taskLists.push(taskList);
    }
    
    this.writeData(data);
    return taskList;
  }

  /**
   * Delete a task list by ID
   * @param id - The ID of the task list to delete
   * @returns True if the task list was deleted, false otherwise
   */
  deleteTaskList(id: string): boolean {
    const data = this.readData();
    const initialLength = data.taskLists.length;
    
    data.taskLists = data.taskLists.filter(taskList => taskList.id !== id);
    
    if (data.taskLists.length !== initialLength) {
      this.writeData(data);
      return true;
    }
    
    return false;
  }

  /**
   * Filter task lists by status (all, completed, pending)
   * @param status - The status to filter by
   * @returns Array of filtered task lists
   */
  filterTaskListsByStatus(status: string): TaskList[] {
    const taskLists = this.getAllTaskLists();
    
    if (status === 'all') {
      return taskLists;
    }
    
    return taskLists.filter(taskList => {
      const allTasksCompleted = taskList.tasks.length > 0 && 
        taskList.tasks.every(task => task.completed);
      
      if (status === 'completed') {
        return allTasksCompleted;
      } else if (status === 'pending') {
        return !allTasksCompleted || taskList.tasks.length === 0;
      }
      
      return true;
    });
  }
}

// Export a singleton instance of DataService
export const dataService = new DataService();
