const db = require('../config/connectdb');
const jwt = require('jsonwebtoken');
const getRelationships = (req, res) =>{
    const q = "select followerUserid from relationships where followedUserid=?";
    db.query(q, [req.query.followedUserid] , (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship=>relationship.followerUserid));
    })
}

const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    console.log(token);
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid");
        console.log(userInfo);
        const q = "INSERT INTO relationships (`followerUserid`, `followedUserid`) VALUES (?)"
        const  values = [
            userInfo.id,
            req.body.followedUserid,
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Following");
        })
    })
}
const deleteRelationship= (req, res) => {
    const token = req.cookies.accessToken;
    console.log(token);
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid");
        console.log(userInfo);
        const q = "delete from relationships where `followerUserid` = ? AND `followedUserid` = ?"
        // const  values = [
        //     userInfo.id,
        //     req.params.postid
        // ];
        db.query(q, [userInfo.id, req.params.followedUserid], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Unfollowed");
        })
    })
}



module.exports = { getRelationships, addRelationship, deleteRelationship}