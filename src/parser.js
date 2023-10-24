import fs from 'fs';
const parsedLog = [];

const interpretLog = (log) => {

}

const parseLog = () => {
  fs.readFile("./src/log/qgames.log", "utf8", (err, file) => {
    const splittedLines = file.split(/\r?\n|\r|\n/g);

    for (let index = 0; index < splittedLines.length; index++) {
      interpretLog(splittedLines[index]);  
    }
    
  });
};

parseLog();
