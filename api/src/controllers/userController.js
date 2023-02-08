const db = require('../config/connectdb');
const jwt = require('jsonwebtoken');
const getUser = (req, res) => {
    const user_id = req.params.id;
    const q = "select * from users where id=?";
    db.query(q, [user_id], (err, data) => {
        if(err) return res.status(500).json(err);
        const { password, ...info } = data[0];
        return res.json(info);
    })
}
module.exports = getUser