const express = require('express');
const pool = require('../db/pgdb');

exports.userInfoVuln = (req, res) => {
  const { username = '', password = '' } = req.body;
  const sql = `SELECT id, username, email, password FROM users WHERE username = '${username}' AND password = '${password}'`;
  console.log('[SQL-VULN] running:', sql);
  pool.query(sql)
    .then(result => {
      const rows = result.rows;
      if (rows.length > 1) {
        pool.query(
          "INSERT INTO attacks(type, details) VALUES ($1, $2)",
          ['sql_tautology', `username:${username},password:${password},rows:${rows.length}`]
        );
      } else {
        pool.query(
          "INSERT INTO attacks(type, details) VALUES ($1, $2)",
          ['sql_lookup', `username:${username},rows:${rows.length}`]
        );
      }
      return res.json({ rows });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'db' });
    });
};

exports.userInfoSafe = (req, res) => {
  const { username = '', password = '' } = req.body;
  const sql = 'SELECT id, username, email FROM users WHERE username = $1 AND password = $2';
  pool.query(sql, [username, password])
    .then(result => {
      const rows = result.rows;
      pool.query(
        "INSERT INTO attacks(type, details) VALUES ($1, $2)",
        ['sql_lookup_safe', `username:${username},rows:${rows.length}`]
      );
      return res.json({ rows });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'db' });
    });
};