const db = require('../config/connectdb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    // Check user if exists

    // req.body.username is placeholders value 
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists");
        // Create a new user 
        /// Hash the password 
        // Generate salt 
        const salt = bcrypt.genSaltSync(10);
        // Generate a password hash(salt + hash)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?)";
        const values = [req.body.username,req.body.email,hashedPassword,req.body.name];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("User has been created");
        });
    });
     
};
const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, req.body.username, (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User not found!");
        
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if(!checkPassword) return res.status(400).json("Wrong username or password");

        //
        const { password, ...others } = data[0];
        const token = jwt.sign({id: data[0].id}, "serectKey");
        // set cookie value
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);

    });
}


const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure:true,
        sameSite:"none",
    }).status(200).json("User has been logout");
}
module.exports = { register, login, logout }
