/** Command-line tool to generate Markov text. */
import fs from 'fs/promises';
import MarkovMachine from './markov.js'
import { stripHtml } from "string-strip-html";
import isURL from 'is-url';
import axios from 'axios';


const argv = process.argv;
const path = argv[2];


async function createWebMM(path, filename) {
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
}


function createLocalMM(path) {

    //read and store text data
    const content = fs.readFileSync(path, 'utf8');
    return new MarkovMachine(content);
};

let markov;
if (isURL(path)) {
    markov = await createWebMM(path);
} else {
    markov = createLocalMM(path);
};
isURL(path)

markov.makeText();