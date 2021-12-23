import Boid from "./Boid";
import Vector from "./Vector";

export default class SpacialHash {

  private gridSize: number
  private hashTable: Array<any>
  private horizontal: number
  private vertical: number

  constructor(bounds: Vector, gridSize: number) {
    this.gridSize = gridSize;
    this.hashTable = [];
    this.horizontal = Math.ceil(bounds.x / gridSize);
    this.vertical = Math.ceil(bounds.y / gridSize);
    for (let a = 0; a <= this.vertical; a++) {
      this.hashTable.push([]);
      for (let b = 0; b <= this.horizontal; b++) {
        this.hashTable[a].push([]);
      }
    }
  }

  public clear() {
    for (let a = 0; a < this.vertical; a++) {
      for (let b = 0; b < this.horizontal; b++) {
        this.hashTable[a][b] = [];
      }
    }
  }

  public insert(object: Boid) {
    let x = Math.floor(object.location.x / this.gridSize);
    let y = Math.floor(object.location.y / this.gridSize);
    if (x < this.horizontal && y < this.vertical) {
      this.hashTable[y][x].push(object);
    }
  }

  public getNeighbours(object: Boid) {
    return [].concat(...this.neighbors(Math.floor(object.location.y / this.gridSize), Math.floor(object.location.x / this.gridSize)))
  }

  private neighbors(m: number, n: number) {
    // define what a neighbor is
    let v = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 0],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    // filter edges & map
    return v
      .filter(
        ([h, j]) =>
          h + m >= 0 && h + m < this.hashTable.length && j + n >= 0 && j + n < this.hashTable[0].length
      )
      .map(([h, j]) => this.hashTable[h + m][j + n]);
  }
}