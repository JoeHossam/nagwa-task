const { wordList } = require('../TestData.json');

const getWords = async (req, res) => {
    return res.send('ok');
};

module.exports = { getWords };
