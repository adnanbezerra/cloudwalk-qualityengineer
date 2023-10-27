import DeathCausesParser from '../../src/parsers/DeathCausesParser';
import { getLines } from '../factory/getLines';

let parser;
beforeEach(() => {
  parser = new DeathCausesParser();
})

describe('DeathCausesParser class tests', () => {
  it("Should clear white spaces from lines", async () => {
    const lines = await getLines("gameWithoutKills");
    const splittedFirstLine = lines[0].split(" ");

    const result = parser.clearWhiteSpaces(splittedFirstLine);
    const expectedResult = ["0:00", "------------------------------------------------------------"];

    expect(result).toEqual(expectedResult);
  })

  it("Should interpret a regular log", async () => {
    const lines = await getLines("gameWithKills");
    const result = parser.getDeathCauses(lines);
    const expectedResult = [{
      'game-1': {
        kills_by_means: {
          MOD_ROCKET: 37,
          MOD_TRIGGER_HURT: 14,
          MOD_RAILGUN: 9,
          MOD_ROCKET_SPLASH: 60,
          MOD_MACHINEGUN: 4,
          MOD_SHOTGUN: 4,
          MOD_FALLING: 3
        }
      }
    }];

    expect(result).toEqual(expectedResult);
  })

  it("Should parse a game without kills", async () => {
    const lines = await getLines("gameWithoutKills");
    const result = parser.getDeathCauses(lines);
    const expectedResult = [{ "game-1": { "kills_by_means": {} } }];

    expect(result).toEqual(expectedResult);
  })

  it("Should parse a glitched game (no ending)", async () => {
    const lines = await getLines("gameWithoutEnd");
    const result = parser.getDeathCauses(lines);
    const expectedResult = [{
      'game-1': {
        kills_by_means: { MOD_TRIGGER_HURT: 7, MOD_ROCKET_SPLASH: 3, MOD_FALLING: 1 }
      }
    }];

    expect(result).toEqual(expectedResult);
  })
})