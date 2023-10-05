import { Injectable } from '@angular/core';
import { interval, map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}
  interval$ = interval(100);

  timer(time: number) {
    return this.interval$.pipe(
      take(time * 10 + 1),
      map((interv) => Math.round((time - interv / 10) * 10) / 10)
    );
  }
}
