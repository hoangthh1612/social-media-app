const db = require('../config/connectdb');
const jwt = require('jsonwebtoken');
const moment = require('moment')
const getPosts = (req, res) => {

    const token = req.cookies.accessToken;
    console.log(token);
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid");
        console.log(userInfo);
        const q = `select p.*, u.id as userid, username, name from posts as p join users as u on (u.id = p.userId) 
        left join relationships as r on (p.userid = r.followedUserid) WHERE r.followerUserid = ? OR p.userid = ?
        order by p.createdAt DESC`;
        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
   
}
const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    console.log(token);
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid");
        console.log(userInfo);
        const q = "INSERT INTO posts (`desc`,`img`,`createdAt`, `userid`) VALUES (?)"
        const  values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id,
            
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created");
        })
    })
}

module.exports = { getPosts,addPost };