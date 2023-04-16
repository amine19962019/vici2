const { Router } = require('express')
const util = require('util')
const { Configuration, OpenAIApi } = require("openai");
const sql = require("../controllers/dbConnection")
const mp3 = require("../controllers/mp3Gen")
const prompts = require("../controllers/prompt");
require('dotenv').config();

const router = Router()


//CREATE OPEN AI RESPONSE
router.get("/", (req, res) => {
    const {msg} = req.session
    if (msg)
    res.send(msg)
    else
    res.send("you have no chat history")
})

router.post("/ads", async (req, res) => {
    // res.json(req.session)
    const { model, temperature, max_tokens, stop, api_key, text } = req.body
    const prompt = { prompts }
    const { msg } = req.session
    
    const configuration = new Configuration({
        apiKey: api_key
    });              
    
    const openai = new OpenAIApi(configuration);

    if (!msg)
        req.session.msg = prompt

    console.log(req.session.msg.prompts.includes(`Human: ${text}\n`))

    if (!req.session.msg.prompts.includes(`Human: ${text}\n`))
        req.session.msg.prompts.push(`Human: ${text}\n`)

    try {

        const response = await openai.createCompletion({
            model: model,
            prompt: req.session.msg.prompts.join('\n'),
            temperature: temperature,
            max_tokens: max_tokens,
            stop: stop,
        });

        let resd = response.data.choices[0].text
        
        if (resd != "")
            req.session.msg.prompts.push(resd)

   
        // GENERATE MP3 RESPONSE
        if (resd.includes("SQL"))
        {
            let query = resd.split("SQL:")[1]
            resd = resd.split("SQL:")[0]
            sql.con(query)
        }

        resd = resd.split(": ")[1]
        mp3.mp3Gen(resd, res, text)

    } catch (error) {
        res.json(error)
    }

})

module.exports = router