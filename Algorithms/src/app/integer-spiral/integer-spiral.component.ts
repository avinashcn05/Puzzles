import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; 

@Component({
  selector: 'app-integer-spiral',
  templateUrl: './integer-spiral.component.html',
  styleUrls: ['./integer-spiral.component.css']
})
export class IntegerSpiralComponent implements OnInit {

  numberArr;
  constructor() { }

  ngOnInit() {
  }


   printMsg(val) {
    $("#printLogTable").append('<tr><td colspan="2"><h4>'+val+'</h4></td></tr>');
  }
  

   generateMatrix(n) {
     n = this.numberArr;
    var total = n*n;
    var result= [];
 
    for(var i=0;i<n;i++) {
    	var rs = [];
    	for(var j=0;j<n;j++) {
    		rs.push(0);
        }	
    	result.push(rs);
    }
    
    var x=0;
    var y=0;
    var step = 0;
    
    var msg = 'current result';
    for(var i=0;i<total;){
    
        while(y+step<n){
            i++;
            result[x][y]=i; 
            y++;
 
        }    
        y--;
        x++;
       // this.print2dArr(result, -1, -1, msg+' with x ='+x+', y ='+y);
        
        
        while(x+step<n){
            i++;
            result[x][y]=i;
            x++;
        }
        x--;
        y--;
        
         
       
        while(y>=step){
            i++;
            result[x][y]=i;
            y--;
        }
        y++;
        x--;
        step++;
       
         
      
        while(x>=step){
            i++;
            result[x][y]=i;
            x--;
        }
        x++;
        y++;
        
    }
 
    this.print2dArr(result, -1, -1,'');
    return result;
}

 print2dArr(arr, x, y, msg) {
	var str = '<tr><td>'+msg+'</td><td><table class="table table-bordered">';
	for ( var i = 0; i < arr.length; i++) {
		str += '<tr>';
		for ( var j = 0; j < arr[i].length; j++) {
			if(i==x && j==y) {
				str += '<td class="tdgridHilight">' + arr[i][j] + '</td>';
			} else {
				str += '<td>' + arr[i][j] + '</td>';	
			}
		}
		str += '</tr>';
	}
	str += '</table></td></tr>';
	$("#printLogTable").append(str);
}

}
