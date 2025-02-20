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

// Add route to accept new game information
router.post('/add', async (req, res) => {
    const { game_name, game_description, classification_id } = req.body;
    const image_path = getVerifiedGameImage(req.files?.image);
    await addNewGame(game_name, game_description, classification_id, image_path);
    res.redirect(`/category/view/${classification_id}`);
});