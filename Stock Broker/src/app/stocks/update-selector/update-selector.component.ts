import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {StockService} from '../shared/stock.service';

@Component({
  selector: 'app-update-selector',
  templateUrl: './update-selector.component.html',
  styleUrls: ['./update-selector.component.scss']
})
export class UpdateSelectorComponent implements OnInit {

  private selectedValue: number;
  @Output() updateSelectorEvent: EventEmitter<number> = new EventEmitter<number>();
  constructor(private snackBar: MatSnackBar, private stockService: StockService) {
    this.selectedValue = this.stockService.getUpdateInterval();
  }

  ngOnInit() {

  }

  valueChanged() {
    this.updateSelectorEvent.emit(this.selectedValue);
    this.snackBar.open(`Update time changed to ${this.selectedValue} minutes!`, 'OK!',  {
      duration: 3000,
    });
  }

}
