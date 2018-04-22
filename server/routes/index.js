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
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const sql = `
        SELECT count(1) FROM users WHERE username = ?
    `
    conn.query(sql, [username], (err, results, fields) => {
        if(results.count > 0) {
            res.status(409).json({
                message: "Username already taken"
            })
        } else {
            const token = jwt.sign({user: username}, config.get('jwt-secret'))
            // const token = uuid()
            const insertSql = `
                INSERT INTO users (username, email, password) VALUES (?,?,?)
            `
            conn.query(insertSql, [username, password, token], (err, results, fields) => {
                console.log(results)
                // results[0].config.headers.Authorization = 'Bearer ' + token
                res.json({
                    message: "User Created",
                    token: token
                })
            })
        }
    })
})

router.post('/token', (req, res, next) => {
    console.log('in index.js /token')
    const username = req.body.username
    const password = req.body.password //encrypt this

    const sql = `
        SELECT id FROM users WHERE username = ? AND password = ?
    `
    conn.query(sql, [username, password], (err, results, fields) => {
        if(results.length > 0) {
            const token = jwt.sign({user: username}, config.get('jwt-secret'))
            // const sqlToken = `
            //     UPDATE users SET token = ? WHERE id = ?
            // `
            // conn.query(sqlToken, [token, results[0].id], (err2, results2, fields2) => {
                res.json({
                    token: token
                })
            // })
        } else {
            res.status(401).json({
                message: "Bad Username and/or Password"
            })
        }
    })
})

module.exports = router