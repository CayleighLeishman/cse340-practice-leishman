// Import express using ESM syntax
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express();
const PORT = process.env.PORT || 3000;
 

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
 
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});