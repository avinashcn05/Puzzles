import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import {MaterialModule} from '../../shared/material/material.module';
import { Observable } from 'rxjs/Observable';
import {StockService} from '../shared/stock.service';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {Stock} from '../shared/models/stock';
import {HttpClientModule} from '@angular/common/http';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {CreateStockComponent} from '../create-stock/create-stock.component';
import {UpdateSelectorComponent} from '../update-selector/update-selector.component';
import {StockComponent} from '../stock/stock.component';
import {StocksListComponent} from '../stocks-list/stocks-list.component';

describe('StocksListComponent', () => {
  let component: CreateStockComponent;
  let fixture: ComponentFixture<CreateStockComponent>;
  let stockService: StockService;
  let router: Router;

  const stockMock: Stock[] = [
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
    fixture = TestBed.createComponent(CreateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(component, 'initForm');
    });

    it('should invoke initForm()', () => {
      component.ngOnInit();
      expect(component.initForm).toHaveBeenCalled();
    });

  });

  describe('initForm()', () => {

    it('should init the form by formGroup', () => {
      component.initForm();
      expect(component.stockForm instanceof FormGroup).toBeTruthy();
      expect(component.stockForm.controls.stockSymbol).toBeDefined();
    });

  });

});
