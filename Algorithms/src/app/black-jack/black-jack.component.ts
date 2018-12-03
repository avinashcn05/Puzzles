import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; 

@Component({
  selector: 'app-black-jack',
  templateUrl: './black-jack.component.html',
  styleUrls: ['./black-jack.component.css']
})
export class BlackJackComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var total = 0;
    $(document).ready(function () {
      $('#hit, #stand').prop('disabled', true);
      $('#message').text('Ready to play?');
      $('#new-game').click(function() {
        $('#message').text('Hit or Stand?');
        $('#dealercard2').css("display", "none");
        $('#hidden-card').addClass("card-back");
        $('#dealer-score').text('?');
    function Card (suit, number) {
        var suit = suit;
        var number = number;
        this.getNumber = function() {
            if (number === 1) {
                return "Ace";
            } else if (number === 11) {
                return "Jack";
            } else if (number === 12) {
                return "Queen";
            } else if (number === 13) {
                return "King";
            } else {
                return number;
            }
        }
        this.getSuit = function() {
            var suitName = '';
            switch (suit) {
              case 1: suitName = "Hearts";
                break;
              case 2: suitName = "Clubs";
                break;
              case 3: suitName = "Spades";
                break;
              case 4: suitName = "Diamonds";
                break;
              } return suitName;
        }
        this.getSymbol = function () {
          var suitName = '';
          switch (suit) {
            case 1: suitName = "&hearts;";
              break;
            case 2: suitName = "&clubs;";
                    break;
                case 3:
                    suitName = "&spades;";
                    break;
                case 4:
                    suitName = "&diams;";
                    break;
          }
          return suitName;
        }
        this.getName = function (){
           var cardName = '';
           switch (number){
               case 1:
                   cardName = "A";
                   break;
               case 13:
                   cardName = "K";
                   break;
               case 12:
                  cardName = "Q";
                   break;
               case 11:
                   cardName = "J";
                   break;
               default:
                   cardName = number;
                   break;
           }
           return cardName+this.getSymbol();
        }
        this.getValue = function() {
            if (number > 10) {
              return 10;
            } else if (number === 1) {
              return 11;
            } else {
              return number;
            }
        }
    }
    
    function deal() {
        var randSuit = Math.floor((Math.random() * 4) + 1);
        var randNum = Math.floor((Math.random() * 13) + 1);
        var card = new Card (randSuit, randNum);
        return card;
    }
    
    function Hand() {
        var myHand = [deal(), deal()];
        this.getHand = function () {
          return myHand;
        }
        this.score = function () {
          var score = 0;
          var aces = 0;
          for(var i = 0; i<myHand.length; i++) {
            if (myHand[i].getValue() === 11) {
              aces += 1;
            }
            score += myHand[i].getValue();
          }
            while (score > 21 && aces > 0) {
               aces -= 1;
              total -= 10;
            }
          return score;
        }
        this.printPlayerHand = function () {
          var card1 = myHand[0].getNumber() + " of " + myHand[0].getSuit();// make for loop to loop through array of myHand and print contents of array into a new div.
          var card2 = myHand[1].getNumber() + " of " + myHand[1].getSuit();
          $('#playercard1').text(card1);
          $('#playercard2').text(card2);
        }
        this.printDealerHand = function () {
          var card1 = myHand[0].getNumber() + " of " + myHand[0].getSuit();
          var card2 = myHand[1].getNumber() + " of " + myHand[1].getSuit();
          $('#dealercard1').text(card1);
          $('#dealercard2').text(card2);
        }
        this.hitMe = function() {
          var newCard = deal();
          myHand.push(newCard);
        }
    }
    var dealerHand = new Hand();
    var playerHand = new Hand();
    dealerHand.printDealerHand();
    playerHand.printPlayerHand();
    $('#player-score').text(playerHand.score());
    if ( playerHand.score() < 21 ) {
      $('#hit, #stand').prop('disabled', false);
    } else if (playerHand.score() === 21) {
      $('#hit, #stand').prop('disabled', true);
      $('#message').text('You got Blackjack!');
      $('#dealercard2').css("display", "");
      $('#hidden-card').removeClass("card-back");
      $('#dealer-score').text(dealerHand.score());
    }
    $('#stand').click(function() {
      $('#dealercard2').css("display", "");
      $('#hidden-card').removeClass("card-back");
      $('#dealer-score').text(dealerHand.score());
      $('#hit, #stand').prop('disabled', true);
      if (dealerHand.score() < playerHand.score()) {
        $('#message').text('You Win!');
      } else { $('#message').text('You Lose!');}
    })
    
    });
    });
  }

}
