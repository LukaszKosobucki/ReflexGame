import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { GameTileComponent } from './game-tile/game-tile.component';
import { TilesService } from 'src/app/services/tiles.service';

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
  @Input() points!: number;
  @Output() pointsChange = new EventEmitter<number>();
  listOfTiles: Tile[] = [];
  constructor(private tilesService: TilesService) {}

  ngOnInit() {
    this.listOfTiles = this.tilesService.generateTiles(6);
  }
  changeClicked($event: number) {
    this.listOfTiles[$event].clicked = !this.listOfTiles[$event].clicked;
    this.checkBoardStatus();
  }

  checkBoardStatus() {
    if (this.listOfTiles.filter((tile) => tile.clicked).length === 2) {
      const clicked = this.listOfTiles.filter((tile) => tile.clicked);
      if (clicked.every((tile) => tile.text === clicked[0].text)) {
        console.log('next level');
        this.pointsChange.emit(this.points + 1);
        this.listOfTiles = this.tilesService.generateTiles(
          6,
          7 + this.points * 6
        );
      } else {
        console.log('try again');
        this.listOfTiles.map((tile) => (tile.clicked = false));
      }
    }
  }
}
