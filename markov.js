const _ = require('lodash');

/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    //.replace(/[.,\/#!$%\^&\*;:{}=\?_`~()]/g, '')
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

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

  makeText(numWords=100) {
    // TODO
    let currentWord = _.sample(this.words);
    console.log(`this is the first word ${currentWord}`);
    let output = `${currentWord} `;
    for(let i = 0; i < numWords; i++) {
      let currChain = this.chains[currentWord];
      let selectedWord = _.sample(currChain);
      currentWord = selectedWord;
      output = output.concat(`${currentWord} `);
    };
    console.log(output);
  };
};

module.exports = MarkovMachine;