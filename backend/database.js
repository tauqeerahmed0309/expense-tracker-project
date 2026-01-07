const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("expense_tracker.db");

db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    amount REAL
  )
`);

module.exports = db;
