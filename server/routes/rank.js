const express = require('express');
const router = express.Router();
const { rank } = require('../controllers/rank');

router.post('/', rank);

module.exports = router;
