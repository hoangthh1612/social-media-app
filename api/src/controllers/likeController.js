const db = require('../config/connectdb');
const jwt = require('jsonwebtoken');
const getLikes = (req, res) =>{
    const q = "select userid from likes where postid = ?";
    db.query(q, [req.query.postid] , (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(data.length);
        return res.status(200).json(data.map(like=>like.userid));
    })
}

const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    console.log(token);
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid");
        console.log(userInfo);
        const q = "INSERT INTO likes (`userid`, `postid`) VALUES (?)"
        const  values = [
            userInfo.id,
            req.body.postid,
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked");
        })
    })
}
const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    console.log(token);
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid");
        console.log(userInfo);
        const q = "delete from likes where `userid` = ? AND `postid` = ?"
        // const  values = [
        //     userInfo.id,
        //     req.params.postid
        // ];
        db.query(q, [userInfo.id, req.params.postid], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been disliked");
        })
    })
}
module.exports = {getLikes, addLike, deleteLike};