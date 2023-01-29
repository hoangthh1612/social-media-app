const express = require('express');
const userRoutes = require('./routes/users')
const likeRoutes = require('./routes/likes')
const commentRoutes = require('./routes/comments')
const postRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const app = express();
const port = 8000;

//middlewares
app.use(express.urlencoded({extended: true}));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(cookieparser())

app.use('/api/home', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/posts', postRoutes);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})