import path from 'path';

// Define paths used throughout the application
export const CONFIG = {
  // Root directory of the project
  ROOT_DIR: path.resolve(__dirname, '..', '..'),
  
  // Source directory
  SRC_DIR: path.resolve(__dirname, '..'),
  
  // Data directory for storing JSON files
  DATA_DIR: path.resolve(__dirname, '..', 'data'),
  
  // Data file path
  DATA_FILE: path.resolve(__dirname, '..', 'data', 'todo-data.json'),
};
