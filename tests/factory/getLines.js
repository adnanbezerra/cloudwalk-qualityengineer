import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

export async function getLines(file) {
  try {
    const data = await readFileAsync(`./tests/logs/${file}.log`, 'utf8');
    const individualLines = data.split(/\r?\n|\r|\n/g);
    return individualLines;

  } catch (err) {
    throw err;
  }
}