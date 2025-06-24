/**
 * API Service for communicating with the backend
 */
class ApiService {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api';
  }

  /**
   * Generic method to make API requests
   * @param {string} url - The URL to make the request to
   * @param {string} method - The HTTP method to use
   * @param {object} body - The request body (for POST, PUT, PATCH requests)
   * @returns {Promise<object>} - The response data
   */
  async request(url, method = 'GET', body = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}${url}`, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * Get all task lists
   * @returns {Promise<object>} - The response data containing task lists
   */
  async getAllTaskLists() {
    return this.request('/tasklists');
  }

  /**
   * Get a task list by ID
   * @param {string} id - The ID of the task list to get
   * @returns {Promise<object>} - The response data containing the task list
   */
  async getTaskListById(id) {
    return this.request(`/tasklists/${id}`);
  }

  /**
   * Create a new task list
   * @param {string} title - The title of the task list
   * @returns {Promise<object>} - The response data containing the created task list
   */
  async createTaskList(title) {
    return this.request('/tasklists', 'POST', { title });
  }

  /**
   * Update a task list
   * @param {string} id - The ID of the task list to update
   * @param {string} title - The new title for the task list
   * @returns {Promise<object>} - The response data containing the updated task list
   */
  async updateTaskList(id, title) {
    return this.request(`/tasklists/${id}`, 'PUT', { title });
  }

  /**
   * Delete a task list
   * @param {string} id - The ID of the task list to delete
   * @returns {Promise<object>} - The response data
   */
  async deleteTaskList(id) {
    return this.request(`/tasklists/${id}`, 'DELETE');
  }

  /**
   * Filter task lists by status
   * @param {string} status - The status to filter by (all, completed, pending)
   * @returns {Promise<object>} - The response data containing filtered task lists
   */
  async filterTaskLists(status) {
    return this.request(`/tasklists/filter/${status}`);
  }

  /**
   * Add a task to a task list
   * @param {string} taskListId - The ID of the task list to add the task to
   * @param {string} description - The description of the task
   * @returns {Promise<object>} - The response data containing the updated task list
   */
  async addTask(taskListId, description) {
    return this.request(`/tasklists/${taskListId}/tasks`, 'POST', { description });
  }

  /**
   * Update a task
   * @param {string} taskListId - The ID of the task list containing the task
   * @param {string} taskId - The ID of the task to update
   * @param {string} description - The new description for the task
   * @returns {Promise<object>} - The response data containing the updated task list
   */
  async updateTask(taskListId, taskId, description) {
    const payload = { description };
    return this.request(`/tasklists/${taskListId}/tasks/${taskId}`, 'PUT', payload);
  }

  /**
   * Delete a task
   * @param {string} taskListId - The ID of the task list containing the task
   * @param {string} taskId - The ID of the task to delete
   * @returns {Promise<object>} - The response data containing the updated task list
   */
  async deleteTask(taskListId, taskId) {
    return this.request(`/tasklists/${taskListId}/tasks/${taskId}`, 'DELETE');
  }

  /**
   * Toggle the completion status of a task
   * @param {string} taskListId - The ID of the task list containing the task
   * @param {string} taskId - The ID of the task to toggle
   * @returns {Promise<object>} - The response data containing the updated task list
   */
  async toggleTaskCompletion(taskListId, taskId) {
    return this.request(`/tasklists/${taskListId}/tasks/${taskId}/toggle`, 'PATCH');
  }
}

// Create a singleton instance of ApiService
const apiService = new ApiService();
