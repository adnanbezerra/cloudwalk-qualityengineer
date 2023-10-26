import fs from 'fs';
const parsedLog = [];
let currentGame = {
  "total_kills": 0,
  "players": [],
  "kills": {}
};
let gameNumber = 1;

const clearWhiteSpaces = (line) => {
  const newArray = [];
  for (const key of line) {
    if (key !== "") newArray.push(key);
  }
  return newArray
}

const interpretLog = (currentLine) => {
  const splittedLine = currentLine.split(" ");
  const line = clearWhiteSpaces(splittedLine);

  if (line.includes("ShutdownGame:") || (line[0]) === "26") {
    let gameName = `game_${gameNumber}`
    parsedLog.push({
      [gameName]: { ...currentGame }
    })
    gameNumber++;
    currentGame = {
      "total_kills": 0,
      "players": [],
      "kills": {}
    };

  } else if (line.includes("ClientUserinfoChanged:")) {
    const provisoryLine = currentLine.split("\\");

    if(!currentGame.players.includes(provisoryLine[1])) {
      currentGame.players.push(provisoryLine[1]);
    }
  } else if (line.includes("Kill:")) {
    currentGame.total_kills++;
  }
}

const parseLog = () => {
  fs.readFile("./src/log/qgames.log", "utf8", (err, file) => {
    const splittedLines = file.split(/\r?\n|\r|\n/g);

    for (let index = 11; index < 97; index++) {
      interpretLog(splittedLines[index]);
    }

    console.log(parsedLog[0]);
  });
};

parseLog();
