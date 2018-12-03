import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksListComponent } from '../stocks-list/stocks-list.component';
import {MaterialModule} from '../../shared/material/material.module';
import { Observable } from 'rxjs/Observable';
import {StockService} from '../shared/stock.service';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {Stock} from '../shared/models/stock';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {CreateStockComponent} from '../create-stock/create-stock.component';
import {UpdateSelectorComponent} from '../update-selector/update-selector.component';
import {StockComponent} from '../stock/stock.component';
import {StockHistoryComponent} from './stock-history.component';
import {SymbolHistory} from '../shared/models/SymbolHistory';

describe('StockHistoryComponent', () => {
  let component: StockHistoryComponent;
  let fixture: ComponentFixture<StockHistoryComponent>;
  let stockService: StockService;
  let router: Router;

  const history: SymbolHistory[] = [
    {date: new Date(), price: 0},
    {date: new Date(), price: 0},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksListComponent, StockComponent, CreateStockComponent, UpdateSelectorComponent, StockHistoryComponent ],
      imports: [
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [StockService]
    })
      .compileComponents();
    stockService = TestBed.get(StockService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



});
