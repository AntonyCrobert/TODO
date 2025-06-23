/**
 * UI Service for handling DOM manipulation and UI interactions
 */
class UiService {
  constructor() {
    // DOM Elements
    this.taskListsContainer = document.getElementById('task-lists-container');
    this.newTaskListInput = document.getElementById('new-task-list-input');
    this.addTaskListBtn = document.getElementById('add-task-list-btn');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    
    // Templates
    this.taskListTemplate = document.getElementById('task-list-template');
    this.taskTemplate = document.getElementById('task-template');
    
    // Modal Elements
    this.editModal = document.getElementById('edit-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.editInput = document.getElementById('edit-input');
    this.saveEditBtn = document.getElementById('save-edit-btn');
    this.closeModalBtn = document.querySelector('.close-modal');
    
    // State
    this.currentFilter = 'all';
    this.editingItem = null;
    this.editingItemType = null;
  }

  /**
   * Initialize the UI
   */
  init() {
    this.setupEventListeners();
  }

  /**
   * Set up event listeners for UI elements
   */
  setupEventListeners() {
    // Close modal when clicking the close button
    this.closeModalBtn.addEventListener('click', () => {
      this.closeModal();
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
      if (event.target === this.editModal) {
        this.closeModal();
      }
    });
    
    // Filter buttons
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.setActiveFilter(button.dataset.filter);
      });
    });
  }

  /**
   * Set the active filter
   * @param {string} filter - The filter to set active
   */
  setActiveFilter(filter) {
    this.currentFilter = filter;
    
    // Update UI to show active filter
    this.filterButtons.forEach(button => {
      if (button.dataset.filter === filter) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  /**
   * Render task lists
   * @param {Array} taskLists - Array of task list objects
   */
  renderTaskLists(taskLists) {
    // Clear the container
    this.taskListsContainer.innerHTML = '';
    
    if (taskLists.length === 0) {
      // Show empty state
      this.taskListsContainer.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-clipboard-list empty-icon"></i>
          <p>No task lists yet. Create one to get started!</p>
        </div>
      `;
      return;
    }
    
    // Render each task list
    taskLists.forEach(taskList => {
      this.renderTaskList(taskList);
    });
  }

  /**
   * Render a single task list
   * @param {Object} taskList - The task list object
   */
  renderTaskList(taskList) {
    // Clone the template
    const taskListElement = this.taskListTemplate.content.cloneNode(true);
    const taskListContainer = taskListElement.querySelector('.task-list');
    
    // Set task list ID
    taskListContainer.dataset.id = taskList.id;
    
    // Set task list title
    taskListElement.querySelector('.task-list-title').textContent = taskList.title;
    
    // Set up event listeners for task list actions
    const editTaskListBtn = taskListElement.querySelector('.edit-task-list-btn');
    const deleteTaskListBtn = taskListElement.querySelector('.delete-task-list-btn');
    const addTaskForm = taskListElement.querySelector('.add-task-form');
    const newTaskInput = taskListElement.querySelector('.new-task-input');
    const addTaskBtn = taskListElement.querySelector('.add-task-btn');
    
    editTaskListBtn.addEventListener('click', () => {
      this.openEditModal('task-list', taskList.id, taskList.title);
    });
    
    deleteTaskListBtn.addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete the task list "${taskList.title}"?`)) {
        app.deleteTaskList(taskList.id);
      }
    });
    
    addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const description = newTaskInput.value.trim();
      if (description) {
        app.addTask(taskList.id, description);
        newTaskInput.value = '';
      }
    });
    
    addTaskBtn.addEventListener('click', () => {
      const description = newTaskInput.value.trim();
      if (description) {
        app.addTask(taskList.id, description);
        newTaskInput.value = '';
      }
    });
    
    // Render tasks
    const tasksContainer = taskListElement.querySelector('.tasks-container');
    
    if (taskList.tasks.length === 0) {
      tasksContainer.innerHTML = '<p class="no-tasks">No tasks yet. Add one below!</p>';
    } else {
      taskList.tasks.forEach(task => {
        const taskElement = this.renderTask(task, taskList.id);
        tasksContainer.appendChild(taskElement);
      });
    }
    
    // Add completed class if all tasks are completed
    if (this.isTaskListCompleted(taskList)) {
      taskListContainer.classList.add('completed');
    }
    
    // Add to the container
    this.taskListsContainer.appendChild(taskListElement);
  }

  /**
   * Render a single task
   * @param {Object} task - The task object
   * @param {string} taskListId - The ID of the task list containing the task
   * @returns {Node} - The task element
   */
  renderTask(task, taskListId) {
    // Clone the template
    const taskElement = this.taskTemplate.content.cloneNode(true);
    const taskContainer = taskElement.querySelector('.task');
    
    // Set task ID
    taskContainer.dataset.id = task.id;
    
    // Set task description
    taskElement.querySelector('.task-description').textContent = task.description;
    
    // Set task completion status
    const checkbox = taskElement.querySelector('.task-checkbox');
    checkbox.checked = task.completed;
    
    if (task.completed) {
      taskContainer.classList.add('completed');
    }
    
    // Set up event listeners for task actions
    checkbox.addEventListener('change', () => {
      app.toggleTaskCompletion(taskListId, task.id);
    });
    
    const editTaskBtn = taskElement.querySelector('.edit-task-btn');
    const deleteTaskBtn = taskElement.querySelector('.delete-task-btn');
    
    editTaskBtn.addEventListener('click', () => {
      this.openEditModal('task', task.id, task.description, taskListId);
    });
    
    deleteTaskBtn.addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete the task "${task.description}"?`)) {
        app.deleteTask(taskListId, task.id);
      }
    });
    
    return taskContainer;
  }

  /**
   * Open the edit modal
   * @param {string} type - The type of item being edited ('task-list' or 'task')
   * @param {string} id - The ID of the item being edited
   * @param {string} currentValue - The current value of the item
   * @param {string} taskListId - The ID of the task list (only for tasks)
   */
  openEditModal(type, id, currentValue, taskListId = null) {
    this.editingItem = id;
    this.editingItemType = type;
    this.editingTaskListId = taskListId;
    
    this.modalTitle.textContent = type === 'task-list' ? 'Edit Task List' : 'Edit Task';
    this.editInput.value = currentValue;
    
    this.editModal.classList.add('show');
    this.editInput.focus();
    
    // Set up save button event listener
    const saveHandler = () => {
      const newValue = this.editInput.value.trim();
      
      if (newValue) {
        if (type === 'task-list') {
          app.updateTaskList(id, newValue);
        } else {
          app.updateTask(taskListId, id, newValue);
        }
        
        this.closeModal();
      }
      
      // Remove event listener to prevent multiple bindings
      this.saveEditBtn.removeEventListener('click', saveHandler);
    };
    
    this.saveEditBtn.addEventListener('click', saveHandler);
    
    // Handle Enter key
    const keyHandler = (e) => {
      if (e.key === 'Enter') {
        saveHandler();
      } else if (e.key === 'Escape') {
        this.closeModal();
      }
    };
    
    this.editInput.addEventListener('keydown', keyHandler);
    
    // Clean up event listener when modal is closed
    this.editModal.addEventListener('transitionend', () => {
      if (!this.editModal.classList.contains('show')) {
        this.editInput.removeEventListener('keydown', keyHandler);
      }
    });
  }

  /**
   * Close the edit modal
   */
  closeModal() {
    this.editModal.classList.remove('show');
    this.editingItem = null;
    this.editingItemType = null;
    this.editingTaskListId = null;
  }

  /**
   * Check if a task list is completed (all tasks are completed)
   * @param {Object} taskList - The task list to check
   * @returns {boolean} - True if all tasks are completed, false otherwise
   */
  isTaskListCompleted(taskList) {
    return taskList.tasks.length > 0 && taskList.tasks.every(task => task.completed);
  }

  /**
   * Show an error message
   * @param {string} message - The error message to show
   */
  showError(message) {
    alert(`Error: ${message}`);
  }
}

// Create a singleton instance of UiService
const uiService = new UiService();
