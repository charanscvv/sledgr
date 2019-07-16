import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { MatchStatsComponent } from './match-stats/match-stats.component';

const routes: Routes = [{
  path: '', children: [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
      path: 'home', component: DashboardComponent
    },
    {
      path: 'game-board', component: GameboardComponent
    },
    {
      path: 'match-stats', component: MatchStatsComponent
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
