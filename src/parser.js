import fs from 'fs';
import GameScoresParser from './parsers/GameScoresParser.js';
import DeathCausesParser from './parsers/DeathCausesParser.js';

if (process.argv[2] && process.argv[2] === '-gameScore') {
  fs.readFile("./src/log/qgames.log", "utf8", (err, file) => {
    const individualLines = file.split(/\r?\n|\r|\n/g);
    const parser = new GameScoresParser();

    const parsedLog = parser.getGameScore(individualLines);

    console.log(parsedLog);
  })
} else if (process.argv[2] && process.argv[2] === '-deathCauses') {
  fs.readFile("./src/log/qgames.log", "utf8", (err, file) => {
    const individualLines = file.split(/\r?\n|\r|\n/g);
    const parser = new DeathCausesParser();

    const parsedLog = parser.getDeathCauses(individualLines);

    console.log(parsedLog);
  })
} else {
  console.log("Insira algum comando válido.");
}
