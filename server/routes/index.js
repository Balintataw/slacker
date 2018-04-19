const express = require('express')
const router = express.Router()
const path = require('path')
const conn = require('../lib/conn')

router.get('/', (req, res, next) => {
    res.send('working')
})

module.exports = router