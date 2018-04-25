const express = require('express')
const router = express.Router()
const path = require('path')
const conn = require('../lib/conn')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const config = require('config')
const sha512 = require('js-sha512')

router.get('/', (req, res, next) => {
    res.send('working')
})

router.post('/registration', (req, res, next) => {
    const username = req.body.username
    const password = sha512(req.body.password)
    const email = req.body.email
    const fname = req.body.fname
    const lname = req.body.lname                          //need to handle photo uploads
    const profile_image = req.body.uploadURL

    const sql = `
        SELECT count(1) FROM users WHERE username = ?
    `
    conn.query(sql, [username], (err, results, fields) => {
        if(results.count > 0) {
            res.status(409).json({
                message: "Username already taken"
            })
        } else {  //create token here
            const token = jwt.sign({user: username}, config.get('jwt-secret'))
            const insertSql = `
                INSERT INTO users (username, password, email, fname, lname, profile_image) VALUES (?,?,?,?,?,?)
            `//removed token here
            conn.query(insertSql, [username, password, email, fname, lname, profile_image], (err2, results2, fields2) => {
                res.json({
                    message: "User Created",
                    token: token,
                    user: username,
                    fname: fname,
                    lname: lname,
                    email: email,
                    profile_image: profile_image
                })
            })
        }
    })
})

router.post('/login', (req, res, next) => {
    const username = req.body.username
    const password = sha512(req.body.password)

    const sql = `
        SELECT * FROM users WHERE username = ? AND password = ?
    `
    conn.query(sql, [username, password], (err, results, fields) => {
        if(results.length > 0) {
            console.log('username and password returned match')
            const token = jwt.sign({user: username}, config.get('jwt-secret'))
            console.log('results ' + JSON.stringify(results))
            res.json({
                message: "Login Successful",
                token: token,
                user: username, //username also attached to token
                email: results[0].email,
                fname: results[0].fname,
                lname: results[0].lname,
                profile_image: results[0].profile_image
            })
        } else {
            res.status(401).json({
                message: "Bad Username and/or Password"
            })
        }
    })
})

module.exports = router