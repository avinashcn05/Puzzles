import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-mystic-square',
  templateUrl: './mystic-square.component.html',
  styleUrls: ['./mystic-square.component.css']
})
export class MysticSquareComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    
  /**
 * Mystic Square game
 * TODO wrap it in SIAF
 * TODO expose it as jQuery extension
 */

/**
 * Direction constants
 */


var UP = [0, 1],
  DOWN = [0, -1],
  LEFT = [-1, 0],
  RIGHT = [1, 0],
  DIRECTIONS = [UP, DOWN, LEFT, RIGHT];

/**
* One single piece of the game.
*/
var Dice = function (value) {
  this.value = value;
}

$.extend(Dice.prototype, {
  get pos() {
    return this._pos;
  },

  set pos(pos) {
    //TODO check if position is an array of two elements
    this._pos = pos;
  },

  get deck() {
    return this._deck;
  },

  set deck(deck) {
    this._deck = deck;
  },

  /**
  * Moves the dice if possible.
  */
  move: function () {
    var dice = this,
      deck = dice.deck;
    deck.move(dice);
  }
});

/**
* The box that contains dices.
*/
var Deck = function (size) {
  var deck = this,
    map = [],
    dices = [],
    dice,
    i, j;

  for (i = 0; i < size; i += 1) {
    map.push([]);
    for (j = 0; j < size; j += 1) {
      dice = new Dice(i * size + j + 1);
      dice.deck = this;
      dice.pos = [i, j];
      dices.push(dice);
      map[i].push(dice);
    }
  }
  //get rid of the last one
  dices.pop();
  map[size - 1][size - 1] = null;

  deck.dices = dices;
  deck.map = map;
  deck.emptyCell = [size - 1, size - 1];
  deck.counter = 0;
  deck.callbacks = {};
};

$.extend(Deck.prototype, {

  /**
  * Defines whether specified position is empty.
  * @arg pos {Array[2]} an array of two integer that specify position on map.
  * @return true if position is empty, false otherwise
  */
  isEmpty: function (pos) {
    var deck = this,
      map = deck.map,
      result;
    if (pos[0] < 0 || pos[0] > map.length - 1) {
      result = false;
    } else {
      result = map[pos[0]][pos[1]] === null;
    }
    return result;
  },

  /**
  * Returns a dice which is at specified position.
  * @arg pos {Array[2]} position
  * @return {Object} a dice, null if the position is empty,
  * or undefined if the position is out of the deck size
  */
  getDice: function (pos) {
    var deck = this,
      map = deck.map,
      result;
    if (pos[0] < 0 || pos[0] > map.length - 1) {
      result = undefined;
    } else {
      result = map[pos[0]][pos[1]];
    }
    return result;
  },

  /**
  * Moves specified dice.
  * @arg dice {Object} the dice
  * @return {Object} the deck (allows chaining)
  */
  move: function (dice) {
    var deck = this,
      direction,
      newPos;
    DIRECTIONS.every(function (d) {
      var pos = [dice.pos[0] + d[0], dice.pos[1] + d[1]];
      if (deck.isEmpty(pos)) {
        direction = d;
        newPos = pos;
        return false;
      }
      return true;
    });
    if (!newPos) {
      throw new Error("The dice " + dice.value + " cannot be moved.");
    }

    deck.dices.pop();
    deck.map[dice.pos[0]][dice.pos[1]] = null;
    deck.emptyCell = dice.pos;
    dice.pos = newPos;
    deck.map[dice.pos[0]][dice.pos[1]] = dice;

    deck.counter += 1;
    deck.trigger('move', { deck: deck, dice: dice, direction: direction });
    return deck;
  },

  /**
  * Returns the dices which can be moved.
  * @return {Array} array of dices which can be moved.
  */
  getMobiles: function () {
    var deck = this,
      ec = deck.emptyCell,
      suspected = [
        [ec[0], ec[1] + 1],
        [ec[0] + 1, ec[1]],
        [ec[0], ec[1] - 1],
        [ec[0] - 1, ec[1]]
      ],
      result = [];
    suspected.forEach(function (pos) {
      var dice = deck.getDice(pos);
      if (dice) {
        result.push(dice);
      }
    });
    return result;
  },

  /**
  * Shuffles the dices for specified times.
  * @arg steps {Integer} number of dice movements
  */
  shuffle: function (steps) {
    var deck = this,
      mobiles,
      previousMoved,
      i, j;
    steps = steps || Math.pow(deck.map.length, 3);
    for (i = 0; i < steps; i += 1) {
      mobiles = deck.getMobiles();
      j = mobiles.indexOf(previousMoved);
      if (j > -1) {
        mobiles.splice(j, 1);
      }
      j = Math.floor(Math.random() * mobiles.length);
      mobiles[j].move();
      previousMoved = mobiles[j];
    }
    deck.resetCounter();
  },

  /**
  * Resets the counter of slides.
  */
  resetCounter: function () {
    var deck = this;
    deck.counter = 0;
  },

  /**
  * Adds callback of an event
  * @param eventType {String} type of event
  * @param callback {Function} callback
  */
  on: function (eventType, callback) {
    var deck = this,
      callbacks = deck.callbacks[eventType];
    if (!callbacks) {
      callbacks = [];
      deck.callbacks[eventType] = callbacks;
    }
    callbacks.push(callback);
  },

  /**
  * Removes subscription of the callback for specified event type.
  * @param eventType {String} type of event
  * @param callback {Function} callback
  */
  off: function (eventType, callback) {
    var deck = this,
      callbacks = deck.callbacks[eventType],
      i;
    if (!callbacks) {
      callbacks = [];
      deck.callbacks[eventType] = callbacks;
    }
    i = callbacks.indexOf(callback);
    if (i > -1) {
      callbacks.splice(i, 1);
    }
  },

  /**
  * Invokes callbacks subscribed for specified event type.
  * @param eventType {String} type of event
  * @param eventParams {Object} additional parameters of an event object
  */
  trigger: function (eventType, eventParams) {
    var deck = this,
      callbacks = deck.callbacks,
      eventCallbacks = callbacks[eventType];
    if (!eventCallbacks) {
      return;
    }
    if (!eventParams) {
      eventParams = {};
    }
    eventParams.eventType = eventType;
    eventCallbacks.forEach(function (callback) {
      callback(eventParams);
    });
  },

  /**
  * Register a movement event callback
  */
  onMove: function (callback) {
    var deck = this;
    deck.on('move', callback);
  }

});


//-----presentation------

/**
* Puzzle view builder
*/
var makePuzzleView = function (deck) {

  /**
  * Deck view builder
  */
  var makeDeckView = function (deck) {
    var deckView = $("<div></div>");
    deckView.addClass('deck');

    deckView.deck = deck;

    deck.dices.forEach(function (dice) {
      var diceView = $('<div id="dice_' + dice.value + '">' + dice.value + '</div>');
      diceView.addClass('dice');
      diceView[0].model = dice;
      dice.view = diceView;
      deckView.append(diceView);
    });
    //arrange dieces
    var map = deck.map,
      dice,
      i, j, w = 40;
    for (i = 0; i < map.length; i += 1) {
      for (j = 0; j < map[i].length; j += 1) {
        dice = map[i][j];
        if (dice) {
          dice.view.css({ top: i * w, left: j * w });
        }
      }
    }
    return deckView;
  };

  var puzzleView = $("<div></div>"),
    shuffleButton = $('<span class="button">Shuffle</span>'),
    msgBox = $('<div class="message"></div>'),
    deckView = makeDeckView(deck);

  //assembling presentation parts
  puzzleView.append(shuffleButton);
  puzzleView.append(deckView);
  puzzleView.append(msgBox);

  //event handling logic
  shuffleButton.on('click', function () { deck.shuffle(); });

  //bind event handler to every dice
  deck.dices.forEach(function (dice) {
    dice.view.on('click', function () {
      try {
        this.model.move();
      } catch (e) {
        msgBox.text(e.message);
        //TODO don't overflow msgBox fx queue
        msgBox.fadeIn();
        msgBox.fadeOut(2500);
      }
    });
  });

  //visual behaviour of dice movement event
  var animationQueue = [],
    isAnimated = false;

  var animate = function animate() {
    isAnimated = true;
    var x = animationQueue.length,
      duration = (140 / (1 + Math.exp(x / 2 - 5))) + 50,
      event = animationQueue.shift(),
      dice = event.dice,
      direction = event.direction;
    var nextAnimation = function () {
      if (animationQueue.length) {
        setTimeout(animate, duration);
      } else {
        isAnimated = false;
      }
    };
    var animation = { top: '+=' + (40 * direction[0]), left: '+=' + (40 * direction[1]) };
    $(dice.view).animate(animation, duration, nextAnimation);
  }

  deck.onMove(function (event) {
    animationQueue.push(event);
    if (!isAnimated) {
      animate();
    }
  });

  return puzzleView;
};

/**
* Creates a mystic square puzzle in the specified container.
* @param {String} container selector
* @param {Integer} size of the puzzle
* @return {Object} container
*/
function mysticSquare(container, size) {
  var puzzleView = makePuzzleView(new Deck(4));
  container = $(container);
  container.append(puzzleView);
  return container;
}

var run = function () {
  mysticSquare($('#deck'), 4);
};

$(run);


  }


}
