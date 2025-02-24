-- Drop existing tables if they exist (to ensure a fresh start)
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS classification;
 
-- Create the classifications table
CREATE TABLE classification (
    classification_id INTEGER PRIMARY KEY AUTOINCREMENT,
    classification_name TEXT NOT NULL
);
 
-- Create the games table
CREATE TABLE game (
    game_id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_name TEXT NOT NULL,
    game_description TEXT NOT NULL,
    classification_id INTEGER NOT NULL,
    image_path TEXT NOT NULL,
    FOREIGN KEY (classification_id) REFERENCES classification (classification_id) ON DELETE CASCADE
);
 
-- Insert initial classifications
INSERT INTO classification (classification_name) VALUES
('Strategy'),
('Party');
 
-- Insert initial games
INSERT INTO game (game_name, game_description, classification_id, image_path) VALUES
('Catan', 'A popular resource-trading and city-building game.', 1, '/images/games/catan.jpg'),
('Risk', 'A world domination game of strategy and conquest.', 1, '/images/games/risk.jpg'),
('Uno', 'A fast-paced card game of matching colors and numbers.', 2, '/images/games/uno.jpg'),
('Apples to Apples', 'A fun word association game perfect for family and friends.', 2, '/images/games/apples-to-apples.jpg');