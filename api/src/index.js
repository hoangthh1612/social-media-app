const express = require('express');
const userRoutes = require('./routes/users')
const app = express();
const port = 8000;

app.use('/api/home', userRoutes)
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})