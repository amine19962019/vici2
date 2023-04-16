const axios = require('axios')

module.exports.mp3Gen = async (prompt, res, ...args) => {
    // console.log("MP3 GEN --> "+prompt)
    params = {
        queryResult: {
            fulfillmentText: prompt
        }
    }

    // MP3 GEN REQUEST
    axios({
        method: 'POST',
        url: 'https://chatbot--dialogflow.herokuapp.com/file',
        data: params
    })
        .then((data) => {
            res.json({
                text: args[0],
                queryText: prompt,
                fulfillmentText : data.data.fulfillmentMessages[0].text.text[0]
            })
        })
        .catch((error) => {
            console.log(error)
    })

}