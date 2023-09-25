import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export type Stats = { level: number; reactionTime: number; mistakes: number };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  POINTS$ = new BehaviorSubject<number>(0);
  STATS$ = new BehaviorSubject<Stats[]>([]);

  getPoints(): Observable<number> {
    console.log(this.POINTS$.subscribe((points) => console.log(points)));
    return this.POINTS$.asObservable();
  }

  increasePoints(points: number) {
    this.POINTS$.next(points + 1);
    console.log(this.POINTS$, 'adfgadf');
  }

  resetPoints() {
    this.POINTS$.next(0);
  }

  getStats(): Observable<Stats[]> {
    return this.STATS$.asObservable();
  }

  addNewStats(statsList: Stats[], statsObject: Stats) {
    this.STATS$.next([...statsList, statsObject]);
  }

  resetStats() {
    this.STATS$.next([]);
  }
}
