import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export type Stats = { level: number; reactionTime: number; mistakes: number };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  POINTS$ = new BehaviorSubject<number>(0);
  STATS$ = new BehaviorSubject<Stats[]>([]);

  getPoints(): BehaviorSubject<number> {
    return this.POINTS$;
  }

  increasePoints(points: number) {
    this.POINTS$.next(points + 1);
  }

  resetPoints() {
    this.POINTS$.next(0);
  }

  getStats(): BehaviorSubject<Stats[]> {
    return this.STATS$;
  }

  addNewStats(statsList: Stats[], statsObject: Stats) {
    this.STATS$.next([...statsList, statsObject]);
  }

  resetStats() {
    this.STATS$.next([]);
  }
}
