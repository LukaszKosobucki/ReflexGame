import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tile } from '../game-board.component';

@Component({
  selector: 'app-game-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.scss'],
})
export class GameTileComponent {
  @Input() tile!: Tile;
  @Input() index!: number;
  @Output() indexOutput = new EventEmitter<number>();
  onClick() {
    this.indexOutput.emit(this.index);
  }
}
