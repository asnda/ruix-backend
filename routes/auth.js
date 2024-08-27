const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const router = express.Router();

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ruix_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Registration route
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = { name, email, password: hashedPassword };

  const sql = 'INSERT INTO users SET ?';
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'User registered successfully' });
  });
});

module.exports = router;