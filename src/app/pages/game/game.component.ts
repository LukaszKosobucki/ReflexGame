import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameBoardComponent } from 'src/app/components/game-board/game-board.component';
import { UserService } from 'src/app/services/user.service';
import { TimerService } from 'src/app/services/timer.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterLink, GameBoardComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  timeLeft!: number;
  interval: any;
  points!: number;
  showGame!: boolean;
  endGame!: boolean;
  stats!: string;
  timerSubscription!: Subscription;
  destroy$ = new Subject<void>();
  constructor(
    private userService: UserService,
    private timerService: TimerService
  ) {}

  ngOnInit() {
    this.showGame = false;
    this.endGame = false;
    this.userService
      .getPoints()
      .pipe(takeUntil(this.destroy$))
      .subscribe((points) => {
        this.points = points;
      });
    this.userService
      .getStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe((stats) => {
        this.stats = JSON.stringify(stats);
      });
  }

  startTimer() {
    this.showGame = true;
    this.timerSubscription = this.timerService
      .timer(15)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (timeLeft) => (this.timeLeft = timeLeft),
        error: () => console.log,
        complete: () => (this.endGame = true),
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  playAgain() {
    clearInterval(this.interval);
    this.showGame = false;
    this.endGame = false;
    this.userService.resetPoints();
    this.userService.resetStats();
  }
}
