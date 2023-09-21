import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  POINTS: number = 0;

  getPoints() {
    return this.POINTS;
  }

  increasePoints() {
    this.POINTS++;
    return this.POINTS;
  }

  resetPoints() {
    this.POINTS = 0;
    return this.POINTS;
  }
}
