import express from 'express';

import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const name = process.env.NAME;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// week 1 
// Define a route handler for the root URL ('/')
app.get('/', (req, res) => {
    res.send(`Hello, ${name}!`);
});


const mode = process.env.MODE || 'production';
const port = process.env.PORT || 3000;

// // Start the server and listen on the specified port
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.ejs'));
});

app.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/partials/footer.ejs'));
});

app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/partials/footer.ejs'));
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


