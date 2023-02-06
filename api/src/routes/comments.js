const express = require('express');
const router = express.Router();
const { getComment, addComment }= require('../controllers/cmtController');

router.get('/', getComment);
router.post('/', addComment);
module.exports = router