import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homepage' },
  { path: 'homepage', pathMatch: 'full', component: HomepageComponent },
  { path: 'game', pathMatch: 'full', component: GameComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'homepage' },
];
