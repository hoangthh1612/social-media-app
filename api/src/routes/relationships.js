const express = require('express');
const router = express.Router();
const {getRelationships, addRelationship, deleteRelationship} = require('../controllers/relationshipCtrl');

router.get('/', getRelationships);
router.post('/', addRelationship);
router.delete('/:followedUserid', deleteRelationship);
module.exports = router
