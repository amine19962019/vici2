const express = require("express");
const session = require("express-session");
const aiResponse = require("./routes/bot")
const hello = require("./routes/hello")
const test = require("./routes/test")

const app = express();

app.use(express.json())
app.use(session({
    secret: 'thisismysecret!',
    resave: false,
    saveUninitialized: false
}))

// ROUTES
app.use("/", hello)
app.use("/api", aiResponse)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}!`))
