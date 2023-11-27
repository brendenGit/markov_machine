/** Command-line tool to generate Markov text. */

const fs = require('fs');
const MarkovMachine = require('./markov');
const argv = process.argv;

console.log(argv);

function createMarkovMachine(path) {

    //read and store text data
    const content = fs.readFileSync(path, 'utf8');
    return new MarkovMachine(content);
};

const markov = createMarkovMachine(argv[2]);
console.log(markov.chains);
markov.makeText();