require("dotenv").config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports.twilioMsg = (prompt, phoneNumber) => {
    client.messages
      .create({body: prompt, from: '+19298224587', to: `+212${phoneNumber}`})
      .then(message => console.log(message.sid))
      .catch(error => console.log(error));
}