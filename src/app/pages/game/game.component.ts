import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameBoardComponent } from 'src/app/components/game-board/game-board.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterLink, GameBoardComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  timeLeft: number = 15;
  interval: any;
  points: number = 0;
  showGame: boolean = false;
  endGame: boolean = false;

  ngOnInit() {
    this.timeLeft = 15;
    this.points = 0;
    this.showGame = false;
    this.endGame = false;
  }

  startTimer() {
    this.showGame = true;
    this.interval = setInterval(() => {
      if (this.timeLeft >= 0.1) {
        this.timeLeft = Math.round((this.timeLeft - 0.1) * 10) / 10;
      } else {
        this.endGame = true;
      }
    }, 100);
  }

  playAgain() {
    clearInterval(this.interval);
    this.showGame = false;
    this.endGame = false;
    this.timeLeft = 15;
    this.points = 0;
  }
}
