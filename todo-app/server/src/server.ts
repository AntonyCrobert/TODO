import { createApp } from './app';
import { CONFIG } from './config/paths';

const PORT = process.env.PORT || 3000;

// Create the Express application
const app = createApp();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}`);
  console.log(`Data file location: ${CONFIG.DATA_FILE}`);
});
