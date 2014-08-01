// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log(this);
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      if (this._currentAttributes[rowIndex].reduce(function(a, b) {
              return a + b;
            }, 0) > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (key in this._currentAttributes) {
        if (key !== "n") {
          if (this.hasRowConflictAt(key)) {
            return true;
          }
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var sum = 0;
      for (key in this._currentAttributes) {
        if (key !== "n") {
          sum += this._currentAttributes[key][colIndex];
          if (sum > 1) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (key in this._currentAttributes) {
        if (key !== "n") {
          if (this.hasColConflictAt(key))
            return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      /*
      if(arguments.length === 0){
        index = 0;
      } else {
        index = arguments[1];
      }
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        return this.hasMajorDiagonalConflictAt(majorDiagonalColumnIndexAtFirstRow+1, index+1);
      }
*/

      // if number passed in is < 0
        // index = Math.abs(number passed in)
      // else

      // if number passed in >= 0
      // index = 0;
      // i = number passed in
      var sum = 0;

      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        var index = 0;
        for (var i = majorDiagonalColumnIndexAtFirstRow; i < this._currentAttributes.n; i++) {
          sum += this._currentAttributes[index][i];
          if (sum > 1) {
            return true;
          }
          index++;
        }
      } else {
        var index = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        var loops = this._currentAttributes.n - index;
        for (var i = 0; i < loops; i++) {
 //         debugger;
          sum += this._currentAttributes[index][i];
          if (sum > 1) {
            return true;
          }
          index++;
        }
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for(var i = 0 - this._currentAttributes.n + 1; i < this._currentAttributes.n; i++){
        if (this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var index;
      if(minorDiagonalColumnIndexAtFirstRow > this._currentAttributes.n - 1){
        index = minorDiagonalColumnIndexAtFirstRow-(this._currentAttributes.n-1);
        minorDiagonalColumnIndexAtFirstRow = this._currentAttributes.n - 1;
      } else{
        index = 0;
      }

      var sum = 0;
      for(var i = minorDiagonalColumnIndexAtFirstRow; i >= 0; i--){
        if(index < this._currentAttributes.n){
          sum += this._currentAttributes[index][i];
          if(sum > 1){
            return true;
          }
          index++;
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //0 - row1, 2- row3
      for(var i = 0; i < this._currentAttributes.n * 2 - 1; i++){
        if(this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
