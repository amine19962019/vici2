const mysql = require('./dbConnection')

module.exports.getPhone = async () => {
    const query = "SELECT phone FROM client LIMIT 1"
    const result = await mysql.con(query)

    console.log("TWILIO ==>> : "+result)
    console.log(typeof(result))

    return result
}

module.exports.getEmail = async () => {
    const query = "SELECT email FROM client LIMIT 1"
    const result = mysql.con(query)

    return result
}