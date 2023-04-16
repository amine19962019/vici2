const mysql = require('../controllers/dbConnection')
const { Router } = require('express')
const router = Router()

router.get("/", (req, res) => {
    mysql.con("SELECT address,city,type,price FROM Real_estate WHERE intent = 'sell' AND city = 'Seattle' AND type = 'Condo' AND price <= 500000;")
})

module.exports = router