const db = require('../config/connectdb');
const jwt = require('jsonwebtoken');
const moment = require('moment')
const getComment = (req, res) => {
    const q = `select c.*, u.id as userid, username, name from comments as c join users as u on (u.id = c.userid) 
    where c.postid = ? order by c.createdAt DESC`;
    db.query(q, [req.query.postid] , (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}
const addComment = (req, res) =>{
    const token = req.cookies.accessToken;
    console.log(token);
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid");
        console.log(userInfo);
        const q = "INSERT INTO comments (`desc`,`createdAt`, `userid`, `postid`) VALUES (?)"
        const  values = [
            req.body.desc,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id,
            req.body.postid,
            
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created");
        })
    })
}

module.exports = { getComment, addComment }