const express = require('express');
const router = express.Router();
const getLikes = require('../controllers/likeController');

router.get('/', getLikes);
module.exports = router