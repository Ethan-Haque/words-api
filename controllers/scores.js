const pool = require('../db');

// Save typing test score
exports.saveScore = async (req, res) => {
    const { accuracy, wpm, sentencecount, timer } = req.body;

    if (!req.session.userId) {
        return res.status(403).json({ msg: 'Not authenticated' });
    }

    try {
        await pool.query(
            'INSERT INTO scores (user_id, accuracy, wpm, sentencecount, timer) VALUES ($1, $2, $3, $4, $5)',
            [req.session.userId, accuracy, wpm, sentencecount, timer]
        );
        res.json({ msg: 'Score saved successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Retrieve all scores for the logged-in user
exports.getScores = async (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: 'Not authenticated' });
    }

    try {
        const scores = await pool.query('SELECT * FROM scores WHERE user_id = $1', [req.session.userId]);
        res.json(scores.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
