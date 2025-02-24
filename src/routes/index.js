import { Router } from 'express';

const router = Router();
 
// The home page route
router.get('/', async (req, res) => {
    res.render('index', { title: 'Home Page' });
});

// About page route
router.get('/about', async (req, res) => {
    res.render('about', { title: 'About Page' });
});

export default router;