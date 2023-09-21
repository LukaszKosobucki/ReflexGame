import { Injectable } from '@angular/core';
import { Tile } from '../components/game-board/game-board.component';

type Size = 6 | 9 | 16;

@Injectable()
export class TilesService {
  constructor() {}

  generateTiles(size: Size, amount: number = 7) {
    let TILES: Tile[] = [];
    while (TILES.length < size) {
      const randomNumber: string = Math.round(
        Math.random() * amount
      ).toString();
      if (!TILES.some((tile) => tile.text === randomNumber)) {
        TILES.push({
          text: randomNumber,
          clicked: false,
        });
      }
    }
    let [randomIndexOne, randomIndexTwo] = this.generateTwoRandomNumbers(size);
    TILES[randomIndexOne] = structuredClone(TILES)[randomIndexTwo];
    return TILES;
  }

  generateTwoRandomNumbers(size: Size): [number, number] {
    const randomOne: number = Math.floor(Math.random() * size);
    let randomTwo: number = Math.floor(Math.random() * size);
    while (randomOne === randomTwo) {
      randomTwo = Math.floor(Math.random() * size);
    }
    return [randomOne, randomTwo];
  }
}
