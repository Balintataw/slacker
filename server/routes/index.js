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
    console.log('here in index.js reg post') //not getting here
    console.log('req.body' + req.body)
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const sql = `
        SELECT count(1) FROM users WHERE username = ?
    `
    conn.query(sql, [username], (err, results, fields) => {
        console.log('index.js registration query results' + results)
        if(results.count > 0) {
            res.status(409).json({
                message: "Username already taken"
            })
        } else {
            const token = jwt.sign({user: username}, config.get('jwt-secret'))
            // const token = uuid()
            console.log('token:' + token )
            const insertSql = `
                INSERT INTO users (username, email, password) VALUES (?,?,?)
            `
            conn.query(insertSql, [username, password, token], (err, results, fields) => {
                console.log(results)
                res.json({
                    message: "User Created"
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