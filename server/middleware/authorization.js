const conn = require('../lib/conn')

function Authorization(req, res, next) {
    let token = req.get('Authorization')

    const reg = /Bearer\s/

    if(token) {
        if(regex.test(token)) {
            token = token.replace(reg, '')
        }

        const sql = `
            SELECT count(1) as count FROM users WHERE token = ?
        `

        conn.query(sql, [token], (err, results, fields) => {
            if(results[0].count > 0) {
                next()
            } else {
                res.status(401).json({
                    message: "Invalid Token"
                })
            }
        })
    } else {
        res.status(401).json({
            message: "Nonexistant Token"
        })
    }
}

module.exports = Authorization