const mysql = require('mysql')
const twilio = require("./twilio")
const mail = require("./sendGrid")
const user = require("./getUser")
const util = require('util')

module.exports.con = async (query, resd="") => {
    let con;

    if (process.env.JAWSDB_URL)
        con = mysql.createConnection(process.env.JAWSDB_URL)
    else
        con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'botdb'
        })

    con.connect((err) => {
        if (err) 
            console.log("Error has been occured while connecting to the database")
    })

    query = query.replace(/[\u2018\u2019]/g, "'");
    con.query(query, async (err, result) => {
        if (err)
            console.log(err)
        else{
            let results;
            if (query.includes("client"))
            {
                results = Object.values(result[0]).toString()
                results = results.replace(',',"")
                return results 
            } else {
                results = Object.values(result[0])
                results.pop()
                results = results.toString()
                results = results.replace(/,/g,' ')
                console.log(`${resd}${results}`)
                const phone = await user.getPhone()
                twilio.twilioMsg(`her are the results:\n${results}`, phone)
            }
        }
    })
}