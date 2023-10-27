import GameScoresParser from '../../src/parsers/GameScoresParser';
import { getLines } from '../factory/getLines';

let parser;
beforeEach(() => {
  parser = new GameScoresParser();
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
    const result = parser.getGameScore(lines);
    const expectedResult = [{
      game_1: {
        total_kills: 131,
        players: [
          'Isgalamido',
          'Oootsimo',
          'Dono da Bola',
          'Assasinu Credi',
          'Zeh',
          'Mal'
        ],
        kills: {
          Isgalamido: 17,
          Oootsimo: 21,
          'Dono da Bola': 12,
          'Assasinu Credi': 16,
          Zeh: 19,
          Mal: 6
        }
      }
    }];

    expect(result).toEqual(expectedResult);
  })

  it("Should parse a game without players", async () => {
    const lines = await getLines("gameWithoutPlayers");
    const result = parser.getGameScore(lines);
    const expectedResult = [{
      "game_1": {
        "total_kills": 0,
        "players": [],
        "kills": {}
      }
    }];

    expect(result).toEqual(expectedResult);
  })

  it("Should parse a glitched game (no ending)", async () => {
    const lines = await getLines("gameWithoutEnd");
    const result = parser.getGameScore(lines);
    const expectedResult = [{
      game_1: {
        total_kills: 11,
        players: ['Isgalamido', 'Mocinha'],
        kills: { Isgalamido: -7, 'Dono da Bola': 0, Mocinha: 0 }
      }
    }];

    expect(result).toEqual(expectedResult);
  })

  it("Should parse a game with players but no kills", async () => {
    const lines = await getLines("gameWithoutKills");
    const result = parser.getGameScore(lines);
    const expectedResult = [{
      game_1: {
        total_kills: 0,
        players: ['Isgalamido'],
        kills: { Isgalamido: 0 }
      }
    }]

    expect(result).toEqual(expectedResult);
  })
})