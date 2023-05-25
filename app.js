// Define Imports and Requirements
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

// Set render engine
app.set('view engine', 'ejs');

// Load environment variables
const apiKeyEnv = process.env.API_KEY;
const openAiInstance = new OpenAIApi(new Configuration({
    apiKey: apiKeyEnv
}));

// Function to ask GPT-3 a question and save response then return it
// Question is passed as a parameter
async function askQuestion(question) {
    // Setup GPT-3
    const completion = await openAiInstance.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 128
    });

    // Save response
    let answer = completion.data.choices[0].text;
    
    // Return response
    return answer;

}

// Middleware and static files
app.use(express.static('public')); // static files
app.use(bodyParser.urlencoded({ extended: true }));


// Load default page
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/index.html`);
});

// Load analysis page
app.get('/analysis', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/enterFenString.html`);
});

// Send FEN to analysis page
app.post('/analysis', (req, res) => {
    
    // Define question from passed form
    let question = `Given a FEN string of ${req.body.fenInput}, what is the best possible move?`;
    
    // Ask GPT-3 the question and save response
    let gptResponse = askQuestion(question).then((answer) => {
        req.body.gptResponse = answer;
        res.render(`analysis.ejs`, { gptResponse: answer })
    });
    
});

// Load board editor page
app.get('/board', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/board.html`);
});

// Load easter egg
app.get('/egg', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/egg.html`);
});

// Load index page
app.get('/index', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/index.html`);
});

// Load login page
app.get('/login', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/login.html`);
});

// Load board editor with a saved board
app.get('/openBoard', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/openBoard.html`);
});

// Load profile page
app.get('/profile', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/profile.html`);
});

// Load saved boards page
app.get('/saved', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/saved.html`);
});

// Catch 404 errors and redirect to 404 page
app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/404.html`);
});

// Export app for server.js usage
module.exports = app;