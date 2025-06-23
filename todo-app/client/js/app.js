/**
 * Main application class for the ToDo app
 */
class TodoApp {
  constructor() {
    // Initialize services
    this.api = apiService;
    this.ui = uiService;
  }

  /**
   * Initialize the application
   */
  async init() {
    // Initialize UI
    this.ui.init();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Load initial data
    await this.loadTaskLists();
  }

  /**
   * Set up event listeners for the application
   */
  setupEventListeners() {
    // Add task list button
    const addTaskListBtn = document.getElementById('add-task-list-btn');
    const newTaskListInput = document.getElementById('new-task-list-input');
    
    addTaskListBtn.addEventListener('click', () => {
      const title = newTaskListInput.value.trim();
      if (title) {
        this.createTaskList(title);
        newTaskListInput.value = '';
      }
    });
    
    // Add task list on Enter key
    newTaskListInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const title = newTaskListInput.value.trim();
        if (title) {
          this.createTaskList(title);
          newTaskListInput.value = '';
        }
      }
    });
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        this.filterTaskLists(filter);
      });
    });
  }

  /**
   * Load all task lists from the API
   */
  async loadTaskLists() {
    try {
      const response = await this.api.getAllTaskLists();
      this.ui.renderTaskLists(response.data);
    } catch (error) {
      this.handleError('Failed to load task lists', error);
    }
  }

  /**
   * Create a new task list
   * @param {string} title - The title of the task list
   */
  async createTaskList(title) {
    try {
      await this.api.createTaskList(title);
      await this.loadTaskLists();
    } catch (error) {
      this.handleError('Failed to create task list', error);
    }
  }

  /**
   * Update a task list
   * @param {string} id - The ID of the task list to update
   * @param {string} title - The new title for the task list
   */
  async updateTaskList(id, title) {
    try {
      await this.api.updateTaskList(id, title);
      await this.loadTaskLists();
    } catch (error) {
      this.handleError('Failed to update task list', error);
    }
  }

  /**
   * Delete a task list
   * @param {string} id - The ID of the task list to delete
   */
  async deleteTaskList(id) {
    try {
      await this.api.deleteTaskList(id);
      await this.loadTaskLists();
    } catch (error) {
      this.handleError('Failed to delete task list', error);
    }
  }

  /**
   * Filter task lists by status
   * @param {string} status - The status to filter by (all, completed, pending)
   */
  async filterTaskLists(status) {
    try {
      const response = await this.api.filterTaskLists(status);
      this.ui.setActiveFilter(status);
      this.ui.renderTaskLists(response.data);
    } catch (error) {
      this.handleError('Failed to filter task lists', error);
    }
  }

  /**
   * Add a task to a task list
   * @param {string} taskListId - The ID of the task list to add the task to
   * @param {string} description - The description of the task
   */
  async addTask(taskListId, description) {
    try {
      await this.api.addTask(taskListId, description);
      await this.loadTaskLists();
    } catch (error) {
      this.handleError('Failed to add task', error);
    }
  }

  /**
   * Update a task
   * @param {string} taskListId - The ID of the task list containing the task
   * @param {string} taskId - The ID of the task to update
   * @param {string} description - The new description for the task
   */
  async updateTask(taskListId, taskId, description) {
    try {
      await this.api.updateTask(taskListId, taskId, description);
      await this.loadTaskLists();
    } catch (error) {
      this.handleError('Failed to update task', error);
    }
  }

  /**
   * Delete a task
   * @param {string} taskListId - The ID of the task list containing the task
   * @param {string} taskId - The ID of the task to delete
   */
  async deleteTask(taskListId, taskId) {
    try {
      await this.api.deleteTask(taskListId, taskId);
      await this.loadTaskLists();
    } catch (error) {
      this.handleError('Failed to delete task', error);
    }
  }

  /**
   * Toggle the completion status of a task
   * @param {string} taskListId - The ID of the task list containing the task
   * @param {string} taskId - The ID of the task to toggle
   */
  async toggleTaskCompletion(taskListId, taskId) {
    try {
      await this.api.toggleTaskCompletion(taskListId, taskId);
      await this.loadTaskLists();
    } catch (error) {
      this.handleError('Failed to toggle task completion', error);
    }
  }

  /**
   * Handle errors
   * @param {string} message - The error message
   * @param {Error} error - The error object
   */
  handleError(message, error) {
    console.error(`${message}:`, error);
    this.ui.showError(message);
  }
}

// Create and initialize the application
const app = new TodoApp();

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  app.init().catch(error => {
    console.error('Failed to initialize app:', error);
  });
});
