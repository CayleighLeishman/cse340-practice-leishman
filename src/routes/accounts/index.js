import { Router } from express;

const router = Router();

router.get('/register', async (req,res) => {
    res.render('register', {title: 'Registration Page'});
});

router.post('/register', async (req,res) => {
    const { email, password, confirmPassword } = req.body;

    //if somethig is not typed in correctly
    if (!email || !password || !confirmPassword) {
        req.flash('error','hold up! somethings not typed correctly!')
        return res.redirect('/account/register')
    }
    
    // Do passwords Match?
    if (password !== confirmPassword) {
        req.flash('error','Drats! Password does not match the registered user!')
        return res.render('/account/register')
    }

    registerUser(email, password)
        .then(() => {
            req.flash('success', 'login Successful! Happy categorizing!');
            res.redirect('/account/login')
        })
        .catch((err) => {
            console.error(err);
            req.flash('error', 'Sorry, we encountered an error during registration. Please try again.');
            res.redirect('errors')
        });
});
