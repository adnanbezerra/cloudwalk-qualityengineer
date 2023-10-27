export default class GameScoresParser {
  parsedLog = [];
  currentGame = {
    "total_kills": 0,
    "players": [],
    "kills": {}
  };
  gameNumber = 1;

  clearWhiteSpaces(line) {
    const newArray = [];
    for (const key of line) {
      if (key !== "") newArray.push(key);
    }
    return newArray
  }

  interpretLog(currentLine) {
    const splittedLine = currentLine.split(" ");
    const line = this.clearWhiteSpaces(splittedLine);

    if (line.includes("ShutdownGame:") || (line[0]) === "26") {
      let gameName = `game_${this.gameNumber}`
      this.parsedLog.push({
        [gameName]: { ...this.currentGame }
      })
      this.gameNumber++;
      this.currentGame = {
        "total_kills": 0,
        "players": [],
        "kills": {}
      };

    } else if (line.includes("ClientUserinfoChanged:")) {
      const provisoryLine = currentLine.split("\\");

      if (!this.currentGame.players.includes(provisoryLine[1])) {
        this.currentGame.kills[provisoryLine[1]] = 0;
      }
      this.currentGame.players[this.clearWhiteSpaces(provisoryLine[0].split(" "))[2] - 2] = provisoryLine[1];

    } else if (line.includes("Kill:")) {
      this.currentGame.total_kills++;
      const player1Regex = /\d+:\d+ Kill: \d+ \d+ \d+: (\S+(?: \S+)*?) killed/;
      const player2Regex = /killed\s(\S.*?)\sby/;

      const killer = line.join(" ").match(player1Regex)[1];
      const killed = line.join(" ").match(player2Regex)[1];

      if (killer === "<world>") {
        this.currentGame.kills[killed]--;
      } else if (killer !== killed) {
        this.currentGame.kills[killer]++;
      }
    }
  }

  getGameScore(lines) {
    for (let index = 0; index < lines.length; index++) {
      this.interpretLog(lines[index]);
    }

    return this.parsedLog;
  }
}