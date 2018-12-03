import {Component, OnInit, ViewChildren} from '@angular/core';
import { StockService } from '../shared/stock.service';
import { Stock } from '../shared/models/stock';
import { RouterLink } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnInit {

  stocks: Stock[];
  updateInterval: number;
  componentError: string;
  constructor(private stockService: StockService) {
    this.updateInterval = stockService.getUpdateInterval(); // default
  }

  ngOnInit(): void {
    Observable.interval(this.updateInterval * 60000).subscribe(u => {
      this.loadStocks();
    });
    this.stockService.update.subscribe(u => this.loadStocks());
    this.loadStocks();
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    }, err => this.errorHandler(err));
  }

  removeSymbol($event: string): void {
    this.stockService.removeSymbol($event);
  }

  updateTimeSelector($event: number): void {
    this.updateInterval = $event;
    this.stockService.setUpdateInterval($event);
  }

  errorHandler(err: HttpErrorResponse): void {
    switch(err.status) {
      case 0:
        this.componentError = 'There is no internet connection, please connect to network and try again';
        break;
      case 500:
      case 501:
      case 502:
      case 503:
      case 400:
        this.componentError = 'Something went wrong with the API, please refresh the page and try again';

    }
  }





}
