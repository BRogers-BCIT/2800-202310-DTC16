// Import dotenv to use env variables
require('dotenv').config();

// Import app from app.js
const app = require(`./app`);

// Define port as dotenv port from env file or default port as 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})