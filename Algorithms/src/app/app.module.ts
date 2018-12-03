import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostFixCalculatorComponent } from './post-fix-calculator/post-fix-calculator.component';
import { AppRoutingModule } from './app-routing.module';
import { CheckWriterComponent } from './check-writer/check-writer.component';
import { BlackJackComponent } from './black-jack/black-jack.component';
import { IntegerSpiralComponent } from './integer-spiral/integer-spiral.component';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';
import { MysticSquareComponent } from './mystic-square/mystic-square.component';

@NgModule({
  declarations: [
    AppComponent,
    PostFixCalculatorComponent,
    CheckWriterComponent,
    BlackJackComponent,
    IntegerSpiralComponent,
    GameOfLifeComponent,
    MysticSquareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
