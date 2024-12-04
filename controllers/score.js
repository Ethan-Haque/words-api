const pool = require('../db');

// Save typing test score
exports.saveScore = async (req, res) => {
    const { accuracy, wpm, sentencecount, timer } = req.body;

    if (!req.session.userId) {
        return res.status(403).json({ msg: 'Not authenticated' });
    }

    try {
        // check for existing score
        const existingScore = await pool.query(
            'SELECT accuracy, wpm FROM scores WHERE user_id = $1 AND sentencecount = $2',
            [req.session.userId, sentencecount]
        );

        if (existingScore.rows.length > 0) {
            const currentScore = existingScore.rows[0];

            // check if the new score is better
            if ((wpm > currentScore.wpm || wpm == currentScore.wpm && accuracy > currentScore.accuracy)) {
                await pool.query(
                    'UPDATE scores SET accuracy = $1, wpm = $2 WHERE user_id = $3 AND sentencecount = $4',
                    [accuracy, wpm, req.session.userId, sentencecount]
                );
                return res.json({ msg: 'Score updated successfully', submitted: true });
            } else {
                return res.json({ msg: 'Score not updated. Existing score is higher or equal.', submitted: false });
            }
        }

        // existing score not found, save new score
        await pool.query(
            'INSERT INTO scores (user_id, accuracy, wpm, sentencecount, timer) VALUES ($1, $2, $3, $4, $5)',
            [req.session.userId, accuracy, wpm, sentencecount, timer]//
        );

        res.json({ msg: 'Score saved successfully', submitted: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// Retrieve all scores for leaderboard
exports.getScores = async (req, res) => {
    const { sentencecount } = req.query;
    if (!sentencecount) {
        sentencecount = 1;
    }

    try {
        // Query to get the top scores for the given sentencecount and timer
        const result = await pool.query(
            `SELECT username, wpm, accuracy, sentencecount 
                FROM scores 
                INNER JOIN users ON scores.user_id = users.id
                WHERE sentencecount = $1
                ORDER BY wpm DESC, accuracy DESC
                LIMIT 10`,
            [sentencecount]
        );

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching leaderboard:', err.message);
        res.status(500).send('Server error');
    }

};
