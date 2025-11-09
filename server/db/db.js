const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbfile = process.env.DB_FILE || path.join(__dirname, 'data.sqlite');

const db = new sqlite3.Database(dbfile, (err) => {
  if (err) {
    console.error('Failed to open DB', err);
  } else {
    console.log('Connected to sqlite DB:', dbfile);
  }
});

module.exports = db;