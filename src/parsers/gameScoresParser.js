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

export const interpretLog = (currentLine) => {
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

    if (!currentGame.players.includes(provisoryLine[1])) {
      currentGame.kills[provisoryLine[1]] = 0;
    }
    currentGame.players[clearWhiteSpaces(provisoryLine[0].split(" "))[2] - 2] = provisoryLine[1];

  } else if (line.includes("Kill:")) {
    currentGame.total_kills++;
    const player1Regex = /\d+:\d+ Kill: \d+ \d+ \d+: (\S+(?: \S+)*?) killed/;
    const player2Regex = /killed\s(\S.*?)\sby/;

    const killer = line.join(" ").match(player1Regex)[1];
    const killed = line.join(" ").match(player2Regex)[1];

    if (killer === "<world>") {
      currentGame.kills[killed]--;
    } else if (killer !== killed) {
      currentGame.kills[killer]++;
    }
  }
}

export const getGameScoreParser = (lines) => {
  for (let index = 0; index < lines.length; index++) {
    interpretLog(lines[index]);
  }

  return parsedLog;
}