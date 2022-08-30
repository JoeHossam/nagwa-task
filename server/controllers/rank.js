const { scoresList } = require('../TestData.json');

const rank = async (req, res) => {
    const { score: userScore } = req.body;
    const sorted = scoresList.sort((a, b) => a - b);
    const pos = sorted.findIndex((score) => score >= userScore);
    const rank = Math.round(100 * (pos / sorted.length) * 100) / 100;
    return res.status(200).json({ rank });
};

module.exports = { rank };
