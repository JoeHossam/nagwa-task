const express = require('express');
const router = express.Router();
const { rank } = require('../middlewares/rank');

router.post('/', rank);

module.exports = router;
