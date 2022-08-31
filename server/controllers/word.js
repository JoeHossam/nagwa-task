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
    const shuffled = shuffleArray(wordList); // A suffled version of wordList
    const result = [];

    // add 1 of each mustHaves words into result
    // and removing it from the shuffled array (to prevent adding the same word twice)
    for (let i = 0; i < mustHaves.length; i++) {
        result.push(shuffled.removeIf((word) => word.pos === mustHaves[i]));
    }

    // add the rest of the 10 elements
    for (let i = 0; i < 10 - mustHaves.length; i++) {
        result.push(shuffled[i]);
    }

    // shuffle the results to prevent always starting with (adjective, adverb, ..) like in the mustHaves array.
    return res.status(200).json({ words: shuffleArray(result) });
};

module.exports = { getWords };
