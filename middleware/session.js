const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('../db');  // PostgreSQL connection pool

// Session configuration
const sessionMiddleware = session({
    store: new pgSession({
        pool,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        sameSite: 'none', // Required for cross-site cookies
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
});

module.exports = sessionMiddleware;
