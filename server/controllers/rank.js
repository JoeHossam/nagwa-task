const { scoresList } = require('../TestData.json');

const rank = async (req, res) => {
    const { score: userScore } = req.body;
    const sorted = scoresList.sort((a, b) => a - b); // sorts the array
    const pos = sorted.findIndex((score) => score >= userScore); // gets the index to know how many values are smaller than the user's score
    const rank = Math.round(100 * (pos / sorted.length) * 100) / 100;
    return res.status(200).json({ rank });
};

module.exports = { rank };
