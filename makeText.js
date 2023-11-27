/** Command-line tool to generate Markov text. */
import fs from 'fs/promises';
import MarkovMachine from './markov.js'
import { stripHtml } from "string-strip-html";
import isURL from 'is-url';
import axios from 'axios';


const argv = process.argv;
const path = argv[2];


async function createWebMM(path, filename) {
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

let markov;
if (isURL(path)) {
    markov = await createWebMM(path);
} else {
    markov = await createLocalMM(path);
};
isURL(path)

markov.makeText();