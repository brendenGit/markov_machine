/** Textual markov chain generator */
const _ = require('lodash');

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    // TODO
    this.chains = {};

    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i] in this.chains) {
        if (!this.chains[this.words[i]].includes(this.words[i + 1])) {
          this.chains[this.words[i]].push(this.words[i + 1]);
        };
      } else {
        this.chains[this.words[i]] = [this.words[i + 1]];
      };
    };
  };


  /** return random text from chains */

  makeText(numWords) {
    const findValidWord = (currWord) => {
      let word = _.sample(this.chains[currWord]);
      if (typeof word !== 'undefined') {
        return word;
      } else {
        return findValidWord(currWord);
      };
    };

    let currWord = _.sample(this.words);
    let output = `${currWord} `;
    
    let appendedWord;
    let count = 0;
    while (count < numWords) {
      appendedWord = findValidWord(currWord);
      output = output.concat(`${appendedWord} `);
      currWord = appendedWord;
      count ++;
    };
    console.log(output);
    return output;
  };
};

module.exports = MarkovMachine;