const express = require('express');
const app = express();

app.use(express.static('public')); // static files

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/index.html`);
});

app.get('*', (req, res) => {
    res.send('404 Not Found');
});

module.exports = app;