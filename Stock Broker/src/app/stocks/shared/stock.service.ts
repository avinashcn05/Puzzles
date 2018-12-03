import { Injectable } from '@angular/core';
import { ApiFunction } from './models/ApiFunction';
import { Observable } from 'rxjs/Observable';
import { Stock } from './models/stock';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Subject} from 'rxjs/Subject';
import {SymbolHistory} from "./models/SymbolHistory";

@Injectable()
export class StockService {

  private baseUrl = `https://www.alphavantage.co/query?function=`;
  private readonly API_KEY = 'E1PANVD6RX146MKB';
  stocks: Stock[];
  update: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {
  }

  generateUrlByFunction(apiFunction: string, symbols: string[]): string {
    let generatedUrl = this.baseUrl;
    switch(apiFunction) {
      case ApiFunction.BATCH_STOCK_QUOTES:
        generatedUrl += `${ApiFunction.BATCH_STOCK_QUOTES}&symbols=${symbols.map(s => s)}&apikey=${this.API_KEY}`;
        break;
      case ApiFunction.TIME_SERIES_DAILY:
        generatedUrl += `${ApiFunction.TIME_SERIES_DAILY}&symbol=${symbols.map(s => s)}&apikey=${this.API_KEY}`;
        break;
    }
     return generatedUrl;
  }

  getStocks(): Observable<Stock[]> {
    console.log('getStocks()');
    const symbols = JSON.parse(localStorage.getItem('symbols'));
    if(!symbols || symbols.length === 0) {
      return Observable.of([]);
    }
    return this.http.get(this.generateUrlByFunction(ApiFunction.BATCH_STOCK_QUOTES, symbols))
      .map(res => res['Stock Quotes'].map(stock => {
        return new Stock(stock['1. symbol'], Number(stock['2. price']), Number(stock['3. volume']), stock['4. timestamp']);
      }));
  }

  isSymbolValid(symbol: string): Observable<boolean> {
    return this.http.get(this.generateUrlByFunction(ApiFunction.BATCH_STOCK_QUOTES, [symbol]))
      .map(res => !!(res['Stock Quotes'] && res['Stock Quotes'].length > 0));
  }

  getStockHistoryBySymbol(symbol: string) {
    const symbols: string[] = [symbol];
    const url = this.generateUrlByFunction(ApiFunction.TIME_SERIES_DAILY, symbols);
    return this.http.get<SymbolHistory>(url).map(res => {
      const parsedHistory: SymbolHistory[] = [];
      if(res['Time Series (Daily)']) {
        Object.keys(res['Time Series (Daily)']).forEach(date => {
          if (res['Time Series (Daily)'][date]) {
            parsedHistory.push({
              date: new Date(date),
              price: res['Time Series (Daily)'][date]['2. high']
            });
          }
        });
      }
      return parsedHistory;
    });
  }

  saveSymbol(symbol: string): void {
    const symbolsList = JSON.parse(localStorage.getItem('symbols'));
    if(!symbolsList) {
      localStorage.setItem('symbols', JSON.stringify([symbol]));
    } else if(!symbolsList.some(s => s === symbol)) {
      symbolsList.push(symbol);
      localStorage.setItem('symbols', JSON.stringify(symbolsList));
    }
  }

  removeSymbol(symbol: string): void {
    let symbolList = JSON.parse(localStorage.getItem('symbols'));
    symbolList = symbolList.filter(s => s.toLowerCase() !== symbol.toLowerCase());
    localStorage.setItem('symbols', JSON.stringify(symbolList));
    // load all stocks from api every delete
    this.update.next(true);
  }

  getUpdateInterval(): number {
    return Number(localStorage.getItem('updateInterval')) || 1;
  }

  setUpdateInterval(time: number) {
    localStorage.setItem('updateInterval', String(time));
  }
}
