const express = require('express');
const userRoutes = require('./routes/users')
const likeRoutes = require('./routes/likes')
const commentRoutes = require('./routes/comments')
const postRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
const commentRouter = require('./routes/comments')
const cookieparser = require('cookie-parser')
const multer = require('multer')
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

app.use(cookieparser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../../client/public/upload")
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })
app.post('/api/upload', upload.single("file"), (req, res)=>{
  const file = req.file;
  res.status(200).json("Successfully");
});

app.use('/api/home', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})