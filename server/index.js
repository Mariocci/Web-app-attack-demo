const path = require('path');
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sqliRoutes = require('./routes/sqli');
const csrfRoutes = require('./routes/csrf');

app.use('/sqli', sqliRoutes);
app.use('/csrf', csrfRoutes);


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.use(express.static(path.join(__dirname, '../client')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
