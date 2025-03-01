import { Router } from express;

const router = Router();

router.get('/register', async (req,res) => {
    res.render('register', {title: 'Registration Page'});
});

// router.post('register', async (req,res) => {
//     const { email, password, confirmPassword } = req.body;

//     //if somethig is not typed in correctly
//     if (!email || !password || !confirmPassword) {
//         return res.render('/account/register')
//     }
    
//     // Do passwords Match?
//     if (password !== confirmPassword) {
//         return res.render('/account/register')
//     }

//     registerUser(email, password)
//         .then(() => {
//             res.render('/account/login')
//         })
//         .catch((err) => {
//             console.error(err);
//             res.render('errors')
//         });
// });
