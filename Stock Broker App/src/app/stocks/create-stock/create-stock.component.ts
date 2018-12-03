import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { StockService } from '../shared/stock.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss']
})
export class CreateStockComponent implements OnInit {

  stockForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private stockService: StockService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.stockForm = this.formBuilder.group({
      stockSymbol: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])]
    });
  }

  saveSymbol() {
    this.stockService.isSymbolValid(this.stockForm.controls.stockSymbol.value).subscribe(response => {
      if(response) {
        this.stockService.saveSymbol(this.stockForm.controls.stockSymbol.value);
        this.router.navigate(['/stocks']);
      } else {
        this.stockForm.controls['stockSymbol'].setErrors({invalidSymbol: true});
      }
    });
  }

}
