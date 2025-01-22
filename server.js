// week 1
// Import express using ESM syntax
import express from 'express';

//week 2 
// Add these imports to your existing imports
import { fileURLToPath } from 'url';
import path from 'path';

// Create an instance of an Express application
const app = express();
const name = process.env.NAME;

//week 2
// Create __dirname and __filename variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// week 1 
// Define a route handler for the root URL ('/')
// app.get('/', (req, res) => {
//     res.send(`Hello, ${name}!`);
// });

// Define the port number the server will listen on
// const PORT = 3000;

// Define important variables
const mode = process.env.MODE || 'production';
const port = process.env.PORT || 3000;

// // Start the server and listen on the specified port
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


//week 2
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/page1.html'));
});

app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/page2.html'));
});


// week 3
// Home page
app.get('/', (req, res) => {
    const title = 'Home Page';
    const content = '<h1>Welcome to the Home Page</h1>';
    const mode = process.env.MODE;
    const port = process.env.PORT;
    res.render('index', { title, content, mode, port });
});


