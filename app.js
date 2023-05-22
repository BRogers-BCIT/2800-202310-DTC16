const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // TODO: Send html files
    //res.sendFile(`${__dirname}/index.html`);
});

app.get('*', (req, res) => {
    res.send('404 Not Found');
});

module.exports = app;