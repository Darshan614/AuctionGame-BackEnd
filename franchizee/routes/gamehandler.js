const express = require('express');
const gameStartController = require('../controllers/gamehandler');

const router = express.Router();

router.post('/createGame',gameStartController.postcreateGame);
router.post('/joinGame',gameStartController.postjoinGame);

module.exports = router;