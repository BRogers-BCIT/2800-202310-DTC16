const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // TODO: Send html files
    //res.sendFile(`${__dirname}/index.html`);
});

module.exports = app;