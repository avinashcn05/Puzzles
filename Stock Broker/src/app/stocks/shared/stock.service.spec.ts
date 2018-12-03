import { TestBed, inject } from '@angular/core/testing';

import { StockService } from './stock.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {Stock} from './models/stock';

describe('StockService', () => {
  let httpClientStub: HttpTestingController;
  let stockService: StockService;

  const stock: Stock = {
    symbol: 'TWTR',
    price: 1.1,
    volume: 10,
    timestamp: new Date()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockService],
      imports: [HttpClientTestingModule]
    });

    stockService = TestBed.get(StockService);
    httpClientStub = TestBed.get(HttpTestingController);

  });

  it('should be created', inject([StockService], (service: StockService) => {
    expect(service).toBeTruthy();
  }));

  describe('generateUrlByFunction', () => {
    it('should return api url with the related function', () => {
      spyOn(stockService, 'generateUrlByFunction').and.returnValue('https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=twtr&apikey=E1PANVD6RX146MKB');
     stockService.saveSymbol('twtr');
     stockService.getStocks();
      expect(stockService.generateUrlByFunction).toHaveBeenCalledWith('BATCH_STOCK_QUOTES', ['twtr']);
    });
  });


});
