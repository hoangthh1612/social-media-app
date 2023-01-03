const mysql = require('mysql')

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Huyhoang@1612',
    database : 'social'
});

module.exports = db