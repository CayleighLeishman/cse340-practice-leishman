import dbPromise from '../../database/index.js';

const addCategory = async (category) => {
    const db = await dbPromise;
    return await db.run('INSERT INTO category (category_name) VALUES (?)', category);
};

const deleteCategory = async (categoryId) => {
    const db = await dbPromise;
    return await db.run('DELETE FROM category WHERE category_id = ?', categoryId);
};

const getCategories = async () => {
    const db = await dbPromise;
    return await db.all('SELECT * FROM category');
};

export { addCategory, deleteCategory, getCategories };
