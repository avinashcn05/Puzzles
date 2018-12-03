

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostFixCalculatorComponent } from './post-fix-calculator/post-fix-calculator.component';
import { CheckWriterComponent } from './check-writer/check-writer.component';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';
import { IntegerSpiralComponent } from './integer-spiral/integer-spiral.component';
import { MysticSquareComponent } from './mystic-square/mystic-square.component';
import { BlackJackComponent } from './black-jack/black-jack.component';

const routes: Routes = [
  {
    path: 'postFix',
    component: PostFixCalculatorComponent
  },
  {
    path: 'checkwriter',
    component: CheckWriterComponent
  },
  {
    path: 'gameoflife',
    component: GameOfLifeComponent
  },{
    path: 'integerspiral',
    component: IntegerSpiralComponent
  },
  {
    path: 'mysticsquare',
    component: MysticSquareComponent
  },
  {
    path: 'blackjack',
    component: BlackJackComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }