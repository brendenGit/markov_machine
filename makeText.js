/** Command-line tool to generate Markov text. */
const fs = require('fs/promises');
const MarkovMachine = require('./markov');
const stripHtml = require('string-strip-html');
const isURL = require('is-url');
const axios = require('axios');

const argv = process.argv;
const path = argv[2];
const numWords = argv[3];


async function createWebMM(path) {
    try {
        let content = await axios.get(path);
        content = content.data;
        content = stripHtml(content, {
            onlyStripTags: ["h1", "p"],
            stripTogetherWithTheirContents: ["h1", "p"],
        })
            .filteredTagLocations.reduce(
                (acc, [from, to]) => `${acc}${content.slice(from, to)}`,
                ""
            )
            .trim();

        content = stripHtml(content).result;
        return new MarkovMachine(content);
    } catch (error) {
        console.error(`Error reading URL: ${error.message}`);
        process.exit(1);
    };
};


async function createLocalMM(path) {
    try {
        const content = await fs.readFile(path, 'utf8');
        return new MarkovMachine(content);
    } catch (error) {
        console.error(`Error reading file/URL: ${error.message}`);
        process.exit(1);
    }
}

async function generateText(numWords) {
    let markov;
    if (isURL(path)) {
        markov = await createWebMM(path);
        markov.makeText(numWords);
    } else {
        markov = await createLocalMM(path);
        markov.makeText(numWords);
    };
};

generateText(numWords);