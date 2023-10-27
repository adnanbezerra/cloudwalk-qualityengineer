import fs from 'fs';
import GameScoresParser from './parsers/GameScoresParser.js';

const parseLog = () => {
  fs.readFile("./src/log/qgames.log", "utf8", (err, file) => {
    const splittedLines = file.split(/\r?\n|\r|\n/g);
    const parser = new GameScoresParser();

    const parsedLog = parser.getGameScore(splittedLines);

    console.log(parsedLog);
  });
};

parseLog();
