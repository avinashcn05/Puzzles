import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Stock } from '../shared/models/stock';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  @Input() stock: Stock;
  @Output() removeSymbolEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  removeSymbol(): void {
    this.removeSymbolEvent.emit(this.stock.symbol);
  }
}
