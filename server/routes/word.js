const express = require('express');
const router = express.Router();
const { getWords } = require('../controllers/word');

router.get('/', getWords);

module.exports = router;
