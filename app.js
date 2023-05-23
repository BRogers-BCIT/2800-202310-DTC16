const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public')); // static files
app.use(bodyParser.urlencoded({ extended: true }));


// Loading default page
app.get('/', (req, res) => {
    // TODO: Redirect user to /profile if they're already logged in
    res.sendFile(`${__dirname}/public/pages/index.html`);
});

// Loading analysis page normally
app.get('/analysis', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/analysis.html`);
});

// Sending FEN to analysis page
app.post('/analysis', (req, res) => {
    console.log(`Got analysis request: ` + req.body.fenInput);
    // Arsam, do your thing here
    // Use req.body.fenInput to get what the user sent
    res.send(`Got analysis request: ` + req.body.fenInput);
    // res.sendFile(`${__dirname}/public/pages/analysis.html`);
});

// Loading board editor page normally
app.get('/board', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/board.html`);
});

// Loading easter egg
app.get('/egg', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/egg.html`);
});

// Loading index page
app.get('/index', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/index.html`);
});

// Loading login page
app.get('/login', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/login.html`);
});

// Loading board editor with a board already opened
app.get('/openBoard', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/openBoard.html`);
});

// Loading profile page
app.get('/profile', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/profile.html`);
});

// Loading saved boards page
app.get('/saved', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/saved.html`);
});

// Error 404
app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/404.html`);
});

// Starting server
module.exports = app;