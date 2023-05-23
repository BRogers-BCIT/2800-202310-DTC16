const express = require('express');
const readline = require('readline');
const { OpenAIApi, Configuration } = require('openai');
const bodyParser = require('body-parser');
const app = express();

async function askQuestion(question) {
    const openai =new OpenAIApi (new Configuration({
        apiKey: process.env.API_KEY
    }))
    
    const userInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    
    userInterface.prompt()
    userInterface.on("line", async input => {
        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: currentFEN}]
        })
        console.log(res.data.choices[0].message.content)
        userInterface.prompt()
    })
}

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
    // let gptResponse = askQuestion(`Given a FEN string of "req.body.fenInput", what is the best possible move?`);
    let gptResponse = `sample text`;
    // Use req.body.fenInput to get what the user sent
    res.send(gptResponse);
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