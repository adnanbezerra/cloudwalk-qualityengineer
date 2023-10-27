import fs from 'fs';
import { getGameScoreParser } from './parsers/gameScoresParser.js';

const parseLog = () => {
  fs.readFile("./src/log/qgames.log", "utf8", (err, file) => {
    const splittedLines = file.split(/\r?\n|\r|\n/g);

    const parsedLog = getGameScoreParser(splittedLines);

    console.log(parsedLog);
  });
};

parseLog();
