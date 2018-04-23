const express = require('express')
const router = express.Router()
const path = require('path')
const conn = require('../lib/conn')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const config = require('config')

router.get('/', (req, res, next) => {
    res.send('working')
})

router.post('/registration', (req, res, next) => {
    console.log('req.body.password line 14 index.js ' + req.body.password)
    const username = req.body.username
    const password = req.body.password //sha512 here
    const email = req.body.email

    const sql = `
        SELECT count(1) FROM users WHERE username = ?
    `
    conn.query(sql, [username], (err, results, fields) => {
        if(results.count > 0) {
            res.status(409).json({
                message: "Username already taken"
            })
        } else {  //attach token data here
            const token = jwt.sign({user: username}, config.get('jwt-secret'))
            console.log('token ' + token)
            const insertSql = `
                INSERT INTO users (username, password, token) VALUES (?,?,?)
            `
            conn.query(insertSql, [username, password, token], (err2, results2, fields2) => {
                console.log('results line32 index.js' + results2)
                res.json({
                    message: "User Created",
                    token: token,
                    user: username,
                })
            })
        }
    })
})

router.post('/login', (req, res, next) => {
    console.log('in index.js /login')
    const username = req.body.username
    const password = req.body.password //encrypt this

    const sql = `
        SELECT id FROM users WHERE username = ? AND password = ?
    `
    conn.query(sql, [username, password], (err, results, fields) => {
        console.log('username and password not matched')
        if(results.length > 0) {
            console.log('username and password returned match')
            const token = jwt.sign({user: username}, config.get('jwt-secret'))
            const sqlToken = `
                UPDATE users SET token = ? WHERE id = ?
            `
            conn.query(sqlToken, [token, results[0].id], (err2, results2, fields2) => {
                res.json({
                    message: "Login Successful",
                    token: token,
                    user: username,
                })
            })
        } else {
            res.status(401).json({
                message: "Bad Username and/or Password"
            })
        }
    })
})

module.exports = router