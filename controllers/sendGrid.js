const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports.sendEmail = (prompt, email) => {
    const msg = {
        to: email,
        from: 'med.khairallah3@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: prompt,
      }

      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
}