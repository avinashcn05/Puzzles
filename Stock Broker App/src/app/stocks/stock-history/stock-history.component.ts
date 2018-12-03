import {Component, OnInit} from '@angular/core';
import {Stock} from '../shared/models/stock';
import {ActivatedRoute, Route} from '@angular/router';
import {StockService} from '../shared/stock.service';
import {SymbolHistory} from '../shared/models/SymbolHistory';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.scss']
})
export class StockHistoryComponent implements OnInit {

  symbolHistory: SymbolHistory[];
  symbolName: string;
  constructor(private route: ActivatedRoute, private stockService: StockService) { }

  ngOnInit() {
    const symbol = this.route.snapshot.paramMap.get('symbol');
    if(symbol) {
      this.symbolName = symbol;
      this.stockService.getStockHistoryBySymbol(symbol).subscribe(symbolHistory => {
        this.symbolHistory = symbolHistory;
      });
    }
  }


}
