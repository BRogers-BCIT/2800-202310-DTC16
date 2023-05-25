// Import text Configuration
import { config } from "dotenv"
config()

// Import API
import { Configuration, OpenAIApi } from "openai"

// Import Text Reader
import readline from "readline"

// Fetches FEN from firebase
var currentFEN = "temp"

// Call User Database
db.collection("users").doc(uUid).get("currentFEN").then(function (doc) {
    currentFEN = doc.data().currentFEN;
}).then(function () {

    // Accesses API
    const openai = new OpenAIApi(new Configuration({
        apiKey: process.env.API_KEY
    }))

    // Create user interface
    const userInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    // Prompt user
    userInterface.prompt()
    userInterface.on("line", async input => {
        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: currentFEN }]
        })
        console.log(res.data.choices[0].message.content)
        userInterface.prompt()
    })

})



