const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public')); // static files
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // TODO: Redirect user to /profile if they're already logged in
    res.sendFile(`${__dirname}/public/pages/index.html`);
});

app.get('/analysis', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/analysis.html`);
});

app.post('/analysis', (req, res) => {
    console.log(`Got analysis request: ` + req.body.fenInput);
    // Arsam, do your thing here
    // Use req.body.fenInput to get what the user sent
    // You may wanna protect against SQL attacks
    res.sendFile(`${__dirname}/public/pages/analysis.html`);
});

app.get('/board', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/board.html`);
});

app.get('/egg', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/egg.html`);
});

app.get('/index', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/index.html`);
});

app.get('/login', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/login.html`);
});

app.get('/openBoard', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/openBoard.html`);
});

app.get('/profile', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/profile.html`);
});

app.get('/saved', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/saved.html`);
});

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/404.html`);
});

module.exports = app;