import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';

let conn = null;

// Log all SQL queries when in development mode
const enableDevModeLogging = () => {
    const originalRun = conn.run.bind(conn);
    const originalGet = conn.get.bind(conn);
    const originalAll = conn.all.bind(conn);
    const originalExec = conn.exec.bind(conn);

    conn.run = async (...args) => {
        console.log('SQL Run:', args);
        return originalRun(...args);
    };

    conn.get = async (...args) => {
        console.log('SQL Get:', args);
        return originalGet(...args);
    };

    conn.all = async (...args) => {
        console.log('SQL All:', args);
        return originalAll(...args);
    };

    conn.exec = async (...args) => {
        console.log('SQL Exec:', args);
        return originalExec(...args);
    };
}

// Ensure a single database connection instance for ths application
const dbPromise = (async () => {
    conn = await open({
        filename: './src/database/db.sqlite',
        driver: sqlite3.Database
    });

    return conn;
})();

// Setup function that can be used on server startup
export const setupDatabase = async (enableLogging = false) => {
    if (enableLogging) {
        enableDevModeLogging();
    }
    const sql = fs.readFileSync('./src/database/setup.sql', 'utf-8');
    const db = await dbPromise;
    await db.exec(sql);
};

export default dbPromise;