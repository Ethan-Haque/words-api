const bcrypt = require('bcrypt');
const pool = require('../db');

exports.createUser = async (req, res) => {
  const { username, passcode } = req.body;

  const normalizedUsername = username.toLowerCase();

  try {
    // Check if the username already exists
    const userExists = await pool.query('SELECT id FROM users WHERE username = $1', [normalizedUsername]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    // Hash the passcode before storing it
    const hashedPasscode = await bcrypt.hash(passcode, 10);

    // Insert new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (username, passcode, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *',
      [normalizedUsername, hashedPasscode]
    );

    req.session.userId = newUser.rows[0].id;
    req.session.username = normalizedUsername;
    
    res.status(201).json({ success: true });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.checkIfUserExists = async (req, res) => {
  const { username } = req.params;

  const normalizedUsername = username.toLowerCase();

  try {
    const user = await pool.query('SELECT id FROM users WHERE username = $1', [normalizedUsername]);

    if (user.rows.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


// Authenticate and login user
exports.login = async (req, res) => {
  const { username, passcode } = req.body;

  const normalizedUsername = username.toLowerCase();

  try {
    const user = await pool.query('SELECT id, passcode FROM users WHERE username = $1', [normalizedUsername]);

    if (user.rows.length === 0) {
      return res.status(400).json({ msg: "User not found", loggedIn: false });
    }

    const validPasscode = await bcrypt.compare(passcode, user.rows[0].passcode);

    if (!validPasscode) {
      return res.status(400).json({ msg: "Invalid passcode", loggedIn: false });
    }

    // Create a session by storing user ID
    req.session.userId = user.rows[0].id;
    req.session.username = normalizedUsername;
    res.json({ msg: 'Logged in successfully', userId: req.session.userId, loggedIn: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Check if user is logged in
exports.checkSession = (req, res) => {
  if (req.session.userId) {
    return res.json({ loggedIn: true, username: req.session.username });
  } else {
    return res.json({ loggedIn: false });
  }
};

// Logout user by destroying session
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ msg: 'Failed to log out' });
    }
    res.clearCookie('connect.sid');  // Clear session cookie
    return res.json({ msg: 'Logged out successfully' });
  });
};