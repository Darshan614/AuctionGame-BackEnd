const express = require('express');
const router = express.Router();
const flowcontroller = require('../controllers/logic');

router.post('/rules',flowcontroller.getrules);
router.post('/bid',flowcontroller.postbid);
router.post('/finalbid',flowcontroller.postfinalbid);
router.post('/getresult',flowcontroller.getresult);

module.exports = router;