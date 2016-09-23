//
// [2016-09-21] Challenge #284 [Intermediate] Punch Card Creator
// https://www.reddit.com/r/dailyprogrammer/comments/53sw7z/20160921_challenge_284_intermediate_punch_card/
// Demo: https://jsbin.com/sapubiberi/edit?js,output
// Kory Becker http://primaryobjects.com
//

export var PunchCardManager = {
  setup: function() {
    var deck = '';

    deck += 'DEC9 &-0123456789ABCDEFGHIJKLMNOPQR/STUVWXYZ:#@\'="[.<(+^!$*);\\],%_>?\n';
    deck += '     ________________________________________________________________ \n';
    deck += '    /&-0123456789ABCDEFGHIJKLMNOPQR/STUVWXYZ:#@\'="[.<(+^!$*);\\],%_>?\n';
    deck += '12 / O           OOOOOOOOO                        OOOOOO              \n';
    deck += '11|   O                   OOOOOOOOO                     OOOOOO        \n';
    deck += ' 0|    O                           OOOOOOOOO                  OOOOOO  \n';
    deck += ' 1|     O        O        O        O                                  \n';
    deck += ' 2|      O        O        O        O       O     O     O     O       \n';
    deck += ' 3|       O        O        O        O       O     O     O     O      \n';
    deck += ' 4|        O        O        O        O       O     O     O     O     \n';
    deck += ' 5|         O        O        O        O       O     O     O     O    \n';
    deck += ' 6|          O        O        O        O       O     O     O     O   \n';
    deck += ' 7|           O        O        O        O       O     O     O     O  \n';
    deck += ' 8|            O        O        O        O OOOOOOOOOOOOOOOOOOOOOOOO  \n';
    deck += ' 9|             O        O        O        O                          \n';
    deck += '  |__________________________________________________________________ \n';

    return deck;
  },

  initialize: function(deck) {
    // Read string layout and assign to hash.
    var deckHash = {};
    var rowNum = 0;
    
    deck.split('\n').forEach(function(row) {
      // Skip first 2 rows.
      if (rowNum > 1) {
        if (rowNum === 2) {
          // Read characters (keys).
          var parts = row.split(/ +\//);
          parts[1].split('').forEach(function(char) {
            deckHash[char] = [];
          });
          
          console.log('Processed ' + Object.keys(deckHash).length + ' instructions.');
        }
        else {
          // Process encodings (values). Start at column 5.
          var keys = Object.keys(deckHash);
          for (var col=5; col<row.length - 1; col++) {
            if (row[col] === 'O') {
              deckHash[keys[col - 5]].push(rowNum - 3);
            }
          }
        }
      }
      
      rowNum++;
    });
    
    return deckHash;
  },

  setCharAt: function(str,index,chr) {
      if(index > str.length-1) return str;
      return str.substr(0,index) + chr + str.substr(index+1);
  },

  encode: function(text, deck) {
    var card = '';
    card += '     ________________________________________________________________\n';
    card += '    /*                                                               \n';
    card += '12 /                                                                 \n';
    card += '11|                                                                  \n';
    card += ' 0|                                                                  \n';
    card += ' 1|                                                                  \n';
    card += ' 2|                                                                  \n';
    card += ' 3|                                                                  \n';
    card += ' 4|                                                                  \n';
    card += ' 5|                                                                  \n';
    card += ' 6|                                                                  \n';
    card += ' 7|                                                                  \n';
    card += ' 8|                                                                  \n';
    card += ' 9|                                                                  \n';
    card += '  |__________________________________________________________________\n';

    text = text.toUpperCase().replace(/ /g, '');
    card = card.replace('*', text);
    
    var rowNum = 0;
    card.split('\n').forEach(function(row) {
      var origRow = row;
      
      if (rowNum > 1 && rowNum < 14) {
        for (var col=0; col<text.length; col++) {
          var char = text[col];

          deck[char].forEach(function(index) {
            if (rowNum - 2 === index) {
              row = PunchCardManager.setCharAt(row, col + 5, 'O');
            }
          });
        }
      }

      card = card.replace(origRow, row);
      rowNum++;
    });
    
    return card;
  }
};

/*// Initialize our deck.
var deck = setup();
var deckHash = initialize(deck);

// Setup input.
var input = [
  'Hello, world!',
  'This is Reddit\'s r/dailyprogrammer challenge.',
  'WRITE (6,7) FORMAT(13H HELLO, WORLD) STOP END'
];

// Encode a punch card for each input.
input.forEach(function(test) {
  var card = encode(test, deckHash);
  $('#output').append('<b>' + test + '</b>');
  $('#output').append('<pre>' + card + '</pre>');
});*/