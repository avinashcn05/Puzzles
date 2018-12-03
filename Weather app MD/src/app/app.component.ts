import {Component} from '@angular/core';

export interface DialogData {
  animal: string;
  name: string;
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app';
  answer: string = '';
  answerDisplay: string = '';
  showSpinner: boolean = false;

  showAnswer() {
    this.showSpinner = true;

    setTimeout(() => {
      this.answerDisplay = this.answer;
      this.showSpinner = false;
    }, 2000);
  }

/**
 * @title Dynamic grid-list
 */
  tiles: Tile[] = [
    {text: '1', cols: 1, rows: 0, color: 'lightgreen'},
    {text: 'app screen', cols: 1, rows: 3, color: 'lightpink'},
    {text: '3', cols: 1, rows: 0, color: 'lightpink'},
    {text: 'Four', cols: 3, rows: 1, color: '#DDBDF1'},
  ];

  
 
    image = 'Please Enable Your Location';
    city = '#CITY';
    country = '#COUNTRY';
    date = 'Day | Month 00 | 00:00am';
    // main = '#MAIN';
    description =  '#DESCRIPTION';
    temp = '#TEMP°';
    temp2 = '#TEMP2';
    status = 'Change to °C';
    btnFooter = 'Change to °C';


    toggleButton(){
      document.getElementById("temp").innerHTML = "oooi"
    }
}// End AppComponent


export class Mingau{
  title = 'Mingau com acucar';
}


/*
 * Date, Month, Time
 */
class getDate_getDay
{
    getDate()
    {
        var d = new Date();
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var checkForAmPm;
        if( d.getHours() < 12 ){ checkForAmPm = "AM"; }else{ checkForAmPm = "PM";}
        
        document.getElementById("date").innerHTML = days[d.getDay()] + "&nbsp;&nbsp;" + month[d.getMonth()] + "&nbsp;&nbsp;" + d.getDate() + "&nbsp;&nbsp;" + d.getFullYear() + "&nbsp;&nbsp;" + d.getHours() + ":" + d.getMinutes() + checkForAmPm;
      }
      
}
window.onload = () =>
{
    var obj = new getDate_getDay();
    obj.getDate();
};


  



