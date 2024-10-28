// CREATE TABLE scores (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//     accuracy NUMERIC(5, 2) NOT NULL,
//     wpm NUMERIC(5, 2) NOT NULL,
//     sentencecount INTEGER NOT NULL,
//     timer INTEGER NOT NULL
// );