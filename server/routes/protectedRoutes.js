const express = require('express')
const router = express.Router()

router.get('/foo', (req, res, next) => {
    res.jason({
        foo: "bar"
    })
})

module.exports = router