const express = require('express')
const router = express.Router()
const conn = require('../lib/conn')

router.get('/profile/:username', (req, res, next) => {
    const username = req.params.username 
    const sql = `
        SELECT * FROM users WHERE username = ?
    `
    conn.query(sql, [username], (err, results, fields) => {
        const profileData = {
            fname: results[0].fname || 'User entered no first name',
            lname: results[0].lname || 'User entered no last name',
            email: results[0].email || 'User entered no email address',
            username: results[0].username || 'Temporary name of Biff assigned',
            image: results[0].profile_image || 'no image'
        }
        res.json({profileData})
    })
})

module.exports = router