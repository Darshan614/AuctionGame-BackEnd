const express = require('express');
const playerController = require('../controllers/players');

const router = express.Router();

router.get('/batsman', playerController.getBatsman);
router.post('/friends',playerController.postInviteFriends);
router.post('/invitation',playerController.postInvitation);

module.exports = router;

