// Import required modules using ESM import syntax
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
 
// Import all other required modules: Route handlers, Middleware, etc.
import baseRoute from './src/routes/index.js';
import layouts from './src/middleware/layouts.js';
import configureStaticPaths from './src/middleware/static-paths.js';
import { notFoundHandler, globalErrorHandler } from './src/middleware/error-handler.js';

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an instance of an Express application
const app = express();
const MODE = process.env.MODE || 'production';
const PORT = process.env.PORT || 3000;
  
// Configure static paths for the Express application
configureStaticPaths(app);

// Set EJS as the view engine and record the location of the views directory
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'src/views'));

// Set Layouts middleware to automatically wrap views in a layout and configure default layout
app.set('layout default', 'default');
app.set('layouts', path.join(__dirname, 'src/views/layouts'));
app.use(layouts);
 
// Use the home route for the root URL
app.use('/', baseRoute);
 
// Apply error handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);
 
// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});

// Example of the home route using the layout
app.get('/', (req, res) => {
    const title = 'Home Page';
    const content = '<h1>Welcome to the Home Page</h1>';
    res.render('index', { title, content });
});

// week 1
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/home.html'));
// });
 
// app.get('/page1', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/page1.html'));
// });
 
// app.get('/page2', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/page2.html'));
// });
 
