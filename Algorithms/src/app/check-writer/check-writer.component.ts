import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-writer',
  templateUrl: './check-writer.component.html',
  styleUrls: ['./check-writer.component.css']
})
export class CheckWriterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  currencyText = 'EnglishCheckWriter';
  currency = 0;


  arr = x => Array.from(x);
  num = x => Number(x) || 0;
  str = x => String(x);
  isEmpty = xs => xs.length === 0;
  take = n => xs => xs.slice(0, n);
  drop = n => xs => xs.slice(n);
  reverse = xs => xs.slice(0).reverse();
  comp = f => g => x => f(g(x));
  not = x => !x;
  chunk = n => xs =>
    this.isEmpty(xs) ? [] : [this.take(n)(xs), ...this.chunk(n)(this.drop(n)(xs))];

  getCurrencyText = n => {

    !n && (n = this.currency);

    let a = [
      '', 'one', 'two', 'three', 'four',
      'five', 'six', 'seven', 'eight', 'nine',
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
      'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];

    let b = [
      '', '', 'twenty', 'thirty', 'forty',
      'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];

    let g = [
      '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
      'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
    ];
    let makeGroup = ([ones, tens, huns]) => {
      return [
        this.num(huns) === 0 ? '' : a[huns] + ' hundred ',
        this.num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
        a[tens + ones] || a[ones]
      ].join('');
    };

    let thousand = (group, i) => group === '' ? group : `${group} ${g[i]}`;

    if (typeof n === 'number')
      return this.getCurrencyText(String(n));
    else if (n === '0')
      return 'zero dollar';
    else
      return this.comp(this.chunk(3))(this.reverse)(this.arr(n))
        .map(makeGroup)
        .map(thousand)
        .filter(this.comp(this.not)(this.isEmpty))
        .reverse()
        .join(' ') + 'dollar'
  };

}
