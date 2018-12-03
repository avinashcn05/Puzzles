import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StocksModule } from './stocks/stocks.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {StocksListComponent} from './stocks/stocks-list/stocks-list.component';
import {CreateStockComponent} from './stocks/create-stock/create-stock.component';
import {StockHistoryComponent} from './stocks/stock-history/stock-history.component';


const routes = [
  { path: 'stocks', component: StocksListComponent },
  { path: 'stocks/add', component: CreateStockComponent },
  { path: 'stocks/:symbol/history', component: StockHistoryComponent },
  { path: '**', component: StocksListComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    StocksModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
