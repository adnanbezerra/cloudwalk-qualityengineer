export default class DeathCausesParser {
  parsedLog = [];
  currentGame = {
    "kills_by_means": {}
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
      let gameName = `game-${this.gameNumber}`
      this.parsedLog.push({
        [gameName]: { ...this.currentGame }
      })
      this.gameNumber++;
      this.currentGame = {
        "kills_by_means": {}
      };

    } else if (line.includes("Kill:")) {
      const deathCause = line[line.length - 1];

      if (this.currentGame.kills_by_means[deathCause]) {
        this.currentGame.kills_by_means[deathCause]++;
      } else {
        this.currentGame.kills_by_means[deathCause] = 1;
      }
    }
  }

  getDeathCauses(lines) {
    for (let index = 0; index < lines.length; index++) {
      this.interpretLog(lines[index]);
    }

    return this.parsedLog;
  }
}