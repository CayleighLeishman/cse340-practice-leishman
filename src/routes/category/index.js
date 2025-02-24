import { Router } from 'express';
import { addCategory, deleteCategory, getCategories } from '../../models/category/index.js';
import { getGamesByCategory, moveGamesToCategory } from '../../models/game/index.js';

const router = Router();

// Add a new category route (view)
router.get('/add', async (req, res) => {
    res.render('category/add', { title: 'Add Category' });
});

// Add a new category route (form submission)
router.post('/add', async (req, res) => {
    // If the category is missing, redirect back to the form
    const category = req.body.name;
    if (!category) {
        res.redirect('/category/add');
        return;
    }

    const result = await addCategory(category);
    
    // If the category was added successfully, redirect to the new category
    if (result.changes === 1) {
        res.redirect(`/category/${result.lastID}`);
        return;
    }

    // If the category was not added successfully, redirect back to the form
    res.redirect('/category/add');
});

// Delete a category route (view)
router.get('/delete', async (req, res) => {
    const categories = await getCategories();
    res.render('category/delete', { title: 'Delete Category', categories });
});

// Delete a category route (form submission)
router.post('/delete/:id', async (req, res) => {
    const category = req.params.id;
    const newCategory = req.body.new_category_id;

    // If the new category is missing or matches the existing, redirect back to the form
    if (!newCategory || category === newCategory) {
        res.redirect('/category/delete');
        return;
    }

    // If a new category is selected, move the games to the new category
    if (newCategory.toLowerCase() !== 'delete') {
        await moveGamesToCategory(category, newCategory);
    }

    // Delete the category
    await deleteCategory(category);
    res.redirect('/category/delete');
});

// View games by category route (view)
router.get('/view/:id', async (req, res, next) => {
    const games = await getGamesByCategory(req.params.id);
    const title = `${games[0]?.category_name || ''} Games`.trim();

    // If no games are found, throw a 404 error
    if (games.length <= 0) {
        const title = 'Category Not Found';
        const error = new Error(title);
        error.title = title;
        error.status = 404;
        next(error);
        return;
    }

    // If the game is missing an image use a placeholder
    for (let i = 0; i < games.length; i++) {
        if (games[i].image_path == '') {
            games[i].image_path = 'https://placehold.co/300x300/jpg'
        }
    }
    
    res.render('category/index', { title, games });
});

export default router;