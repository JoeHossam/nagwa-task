const { wordList } = require('../TestData.json');

// adding to arrays a function that removes the first element and returns it when condition is met
Array.prototype.removeIf = function (callback) {
    let i = 0;
    while (i < this.length) {
        if (callback(this[i], i)) {
            return this.splice(i, 1)[0];
        } else {
            i++;
        }
    }
};

const getWords = async (req, res) => {
    const shuffleArray = (arr) => {
        return [...arr].sort(() => 0.5 - Math.random());
    };

    const mustHaves = ['adjective', 'adverb', 'noun', 'verb'];
    const shuffled = shuffleArray(wordList);
    const result = [];

    for (let i = 0; i < mustHaves.length; i++) {
        result.push(shuffled.removeIf((word) => word.pos === mustHaves[i]));
    }

    for (let i = 0; i < 10 - mustHaves.length; i++) {
        result.push(shuffled[i]);
    }

    return res.status(200).json({ words: shuffleArray(result) });
};

module.exports = { getWords };
