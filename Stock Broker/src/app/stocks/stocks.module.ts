import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StocksListComponent } from './stocks-list/stocks-list.component';
import { StockComponent } from './stock/stock.component';
import { StockService } from './shared/stock.service';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { UpdateSelectorComponent } from './update-selector/update-selector.component';
import { StockHistoryComponent } from './stock-history/stock-history.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [StocksListComponent],
  providers: [StockService],
  declarations: [StocksListComponent, StockComponent, CreateStockComponent, UpdateSelectorComponent, StockHistoryComponent]
})
export class StocksModule { }
