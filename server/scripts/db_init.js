const db = require('../db/db');
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        email TEXT
    )`);

    db.run(`CREATE TABLE attacks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);


    db.run(`INSERT OR IGNORE INTO users (id, username, password, email) VALUES (1, 'alice', 'pass123', 'alice@example.com')`);
    db.run(`INSERT OR IGNORE INTO users (id, username, password, email) VALUES (2, 'bob', 'pass456', 'bob@example.com')`);
    db.run(`INSERT OR IGNORE INTO users (id, username, password, email) VALUES (2, 'martin', 'pass333', 'martin@example.com')`);
    
    console.log('DB init complete');
    db.close();
});