import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import { getCategories } from '../../models/category/index.js';
import { addNewGame, deleteGame, getGameById, getGamesByCategory, updateGame } from '../../models/game/index.js';

const router = Router();

// Helper function to verify and move uploaded game image
const getVerifiedGameImage = (images = []) => {
    // Exit early if no valid images array provided
    if (!images || images.length === 0) {
        return '';
    }

    // Process first image (assuming single image upload)
    const image = images[0];
    const imagePath = path.join(process.cwd(), `public/images/games/${image.newFilename}`);
    
    // Move uploaded file from temp location to permanent storage
    fs.renameSync(image.filepath, imagePath);

    // Cleanup by removing any remaining temporary files
    images.forEach(image => {
        if (fs.existsSync(image.filepath)) {
            fs.unlinkSync(image.filepath);
        }
    });

    // Return the new frontend image path for storage in the database
    return `/images/games/${image.newFilename}`;
};

// Add new game route (view)
router.get('/add', async (req, res) => {
    const categories = await getCategories();
    res.render('game/add', { title: 'Add New Game', categories });
});

// Add new game route (form submission)
router.post('/add', async (req, res) => {
    const { game_name, game_description, category_id } = req.body;
    const image_path = getVerifiedGameImage(req.files?.image);
    await addNewGame(game_name, game_description, category_id, image_path);
    res.redirect(`/game/view/${category_id}`);
});

// Delete game route (form submission)
router.post('/delete/:id', async (req, res) => {
    const referer = req.get('Referer') || '/';
    console.log(referer);
    await deleteGame(req.params?.id || null);
    res.redirect(referer);
});

// Edit existing game route (view)
router.get('/edit/:id', async (req, res) => {
    const categories = await getCategories();
    const game = await getGameById(req.params.id);
    res.render('game/edit', { title: 'Edit Game', categories, game });
});

// Edit existing game route (form submission)
router.post('/edit/:id', async (req, res) => {
    // Get existing game data to handle image replacement
    const oldGameData = await getGameById(req.params.id);
 
    // Extract form data and process any uploaded image
    const { game_name, game_description, category_id } = req.body;
    const image_path = getVerifiedGameImage(req.files?.image);
    
    // Update game details in database
    await updateGame(req.params.id, game_name, game_description, category_id, image_path);
 
    // Clean up old image file if a new one was uploaded
    if (image_path && image_path !== oldGameData.image_path) {
        const oldImagePath = path.join(process.cwd(), `public${oldGameData.image_path}`);
        // Only delete if file exists and is actually a file (not directory)
        if (fs.existsSync(oldImagePath) && fs.lstatSync(oldImagePath).isFile()) {
            fs.unlinkSync(oldImagePath);
        }
    }
 
    // Return to game category view page
    res.redirect(`/game/view/${category_id}`);
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