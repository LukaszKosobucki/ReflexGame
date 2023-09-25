import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { GameTileComponent } from './game-tile/game-tile.component';
import { TilesService } from 'src/app/services/tiles.service';
import { Stats, UserService } from 'src/app/services/user.service';

export type Tile = {
  text: string;
  clicked: boolean;
};

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, GameTileComponent, NgForOf],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  providers: [TilesService],
})
export class GameBoardComponent implements OnInit {
  @Input() timeLeft!: number;
  points!: number;
  stats!: Stats[];
  listOfTiles: Tile[] = [];
  mistakes: number = 0;

  constructor(
    private tilesService: TilesService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.listOfTiles = this.tilesService.generateTiles(6);
    this.userService.getPoints().subscribe((points) => (this.points = points));
    this.userService.getStats().subscribe((stats) => (this.stats = stats));
  }
  changeClicked($event: number) {
    this.listOfTiles[$event].clicked = !this.listOfTiles[$event].clicked;
    this.checkBoardStatus();
  }

  checkBoardStatus() {
    if (this.listOfTiles.filter((tile) => tile.clicked).length === 2) {
      const clicked = this.listOfTiles.filter((tile) => tile.clicked);
      if (clicked.every((tile) => tile.text === clicked[0].text)) {
        console.log('next level', this.points);
        this.userService.addNewStats(this.stats, {
          level: this.points,
          reactionTime: this.timeLeft,
          mistakes: this.mistakes,
        });
        this.mistakes = 0;
        this.userService.increasePoints(this.points);
        this.listOfTiles = this.tilesService.generateTiles(
          this.tilesService.calculateSize(this.points),
          7 + this.points * 6
        );
      } else {
        console.log('try again');
        this.mistakes++;
        this.listOfTiles.map((tile) => (tile.clicked = false));
      }
    }
  }
}
