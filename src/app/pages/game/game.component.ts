import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameBoardComponent } from 'src/app/components/game-board/game-board.component';
import { UserService } from 'src/app/services/user.service';
import { TimerService } from 'src/app/services/timer.service';
import { Subscription } from 'rxjs';

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
  constructor(
    private userService: UserService,
    private timerService: TimerService
  ) {}

  ngOnInit() {
    this.showGame = false;
    this.endGame = false;
    this.userService.getPoints().subscribe((points) => {
      this.points = points;
      console.log(this.points, 'asdfasdfasfasd');
    });
    this.userService.getStats().subscribe((stats) => {
      this.stats = JSON.stringify(stats);
    });
  }

  startTimer() {
    this.showGame = true;
    this.timerSubscription = this.timerService.timer(15).subscribe({
      next: (timeLeft) => (this.timeLeft = timeLeft),
      error: () => console.log,
      complete: () => (this.endGame = true),
    });
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  playAgain() {
    clearInterval(this.interval);
    this.showGame = false;
    this.endGame = false;
    this.userService.resetPoints();
    this.userService.resetStats();
  }
}
