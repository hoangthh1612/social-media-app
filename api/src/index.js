const express = require('express');
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const app = express();
const port = 8000;

app.use('/api/home', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})