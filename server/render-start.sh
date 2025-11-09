#!/bin/bash
# Render start script for SQLite
npm install
node server/scripts/db_init.js
node server/index.js
