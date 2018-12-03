import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksListComponent } from './stocks-list.component';
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

describe('StocksListComponent', () => {
  let component: StocksListComponent;
  let fixture: ComponentFixture<StocksListComponent>;
  let stockService: StockService;
  let router: Router;

  const stocksMock: Stock[] = [
    {symbol: 'TWTR', price: 0, volume: 0, timestamp: new Date() },
    {symbol: 'FB', price: 0, volume: 0, timestamp: new Date() },
  ];
  const routes = [
    { path: 'stocks', component: StocksListComponent },
    { path: 'stocks/add', component: CreateStockComponent },
    { path: '**', component: StocksListComponent }
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksListComponent, StockComponent, CreateStockComponent, UpdateSelectorComponent ],
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
    fixture = TestBed.createComponent(StocksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit ()', () => {
    beforeEach(() => {
      spyOn(stockService, 'getStocks').and.returnValue(Observable.of(stocksMock));
    });

    it('loads stock list', () => {
      component.ngOnInit();
      expect(component.stocks).toEqual(stocksMock);
    });
  });

  describe('Main functions' , () => {
    beforeEach(() => {
      spyOn(stockService, 'removeSymbol');
      spyOn(stockService, 'setUpdateInterval');
    });

    it('should invoke removeSumbol() on stocksService', () => {
      component.removeSymbol('TWTR');
      expect(stockService.removeSymbol).toHaveBeenCalled();
    });

    it('should invoke setUpdateInterval() on stocksService and change updateInterval to 10', () => {
      component.updateTimeSelector(10);
      expect(stockService.setUpdateInterval).toHaveBeenCalled();
      expect(component.updateInterval).toEqual(10);
    });

  });

});
