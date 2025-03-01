import dbPromise from '../../database/index.js';
 
const registerUser = async (email, password) => {
    const db = await dbPromise;
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    return await db.run(sql, email, password);
}
 
const verifyUser = async (email, password) => {
    const db = await dbPromise;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    return await db.get(sql, email, password);
}
 
export { registerUser, verifyUser };