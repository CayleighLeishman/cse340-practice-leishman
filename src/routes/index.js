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

//registration Page Route

 router.get('/register', async (req,res)=> {
    res.render('account/register', {title: 'Registration'});   
 });

// Login Page rote
router.get('/login',async (req,res) => {
    res.render('account/login', {title: 'Login Page' });
});

// Account info 
router.get('/account', async (req,res) => {
    res.render('account/index', {title: 'Accounts Page'})
});


export default router;

