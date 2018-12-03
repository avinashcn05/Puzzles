import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-fix-calculator',
  templateUrl: './post-fix-calculator.component.html',
  styleUrls: ['./post-fix-calculator.component.css']
})
export class PostFixCalculatorComponent implements OnInit {

  expression: any;
  result:any;
  constructor() { }

  ngOnInit() {
  }

  getExpression() {

    let expression = this.expression;
    
      if (typeof expression !== 'string') {
        if (expression instanceof String) {
          expression = expression.toString();
        } else {
          return null;
        }
      }
  
      var result;
      var tokens = expression.split(/\s+/);
      var stack = [];
      var first;
      var second;
      var containsInvalidChars = /[^()+\-*/0-9.\s]/gi.test(expression);
  
      if (containsInvalidChars) {
        return null;
      }
  
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
  
        if (token === '*') {
          second = stack.pop();
          first = stack.pop();
  
          if (typeof first === 'undefined') {
            first = 1;
          }
  
          if (typeof second === 'undefined') {
            second = 1;
          }
  
          stack.push(first * second);
        } else if (token === '/') {
          second = stack.pop();
          first = stack.pop();
          stack.push(first / second);
        } else if (token === '+') {
          second = stack.pop();
          first = stack.pop();
          stack.push(first + second);
        } else if (token === '-') {
          second = stack.pop();
          first = stack.pop();
          stack.push(first - second);
        } else {
          if (!isNaN(token)) {
            stack.push(Number(token));
          }
        }
      }
  
      result = stack.pop();
  
      this.result = result;
    }
  
    
  }

