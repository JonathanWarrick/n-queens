/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard,
// with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});

  var solution = board._currentAttributes;
  delete solution.n;

  var hasRowConflictAt = function(rowIndex) {
    if (solution[rowIndex].reduce(function(a, b) {
      return a + b;
    }, 0) === 1) {
      return true;
    } else {
      return false;
    }
  };

  var hasColConflictAt = function(colIndex) {
    var sum = 0;
    for (key in solution) {
      if (key !== "n") {
        sum += solution[key][colIndex];
        if (sum === 1) {
          return true;
        }
      }
    }
    return false;
  };

  var loop = function(obj, arr) {
    if (obj === 3 && arr === 2) {
       // debugger;
    }
    if (obj === n - 1 && arr === n - 1) {
      if (!hasRowConflictAt(obj) &&
          !hasColConflictAt(arr)) {
        solution[obj][arr] = 1;
      }
      return solution;
    } else {
      if (!hasRowConflictAt(obj) &&
          !hasColConflictAt(arr)) {
        solution[obj][arr] = 1;
      }
      var objIndex = obj;
      var arrIndex = arr;
      if (arrIndex === n - 1) {
        objIndex++;
        arrIndex = 0;
      } else {
        arrIndex++;
      }
      return loop(objIndex, arrIndex);
    }
  };
  loop(0, 0);

  var solutionArray = [];
  for (var key in solution) {
    solutionArray.push(solution[key]);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionArray));
  return solutionArray;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var outcomesRun = 0;
  var piecesPlayed = 0;

  var board = new Board({n:n});

  var solution = board._currentAttributes;
  delete solution.n;

  var hasRowConflictAt = function(rowIndex) {
    if (solution[rowIndex].reduce(function(a, b) {
      return a + b;
    }, 0) === 1) {
      return true;
    } else {
      return false;
    }
  };

  var hasColConflictAt = function(colIndex) {
    var sum = 0;
    for (key in solution) {
      if (key !== "n") {
        sum += solution[key][colIndex];
        if (sum === 1) {
          return true;
        }
      }
    }
    return false;
  };

  var resetBoard = function() {
    for (var key in solution) {
      for (var i = 0; i < n; i++) {
        solution[key][i] = 0;
      }
    }
  };

  var loop = function(obj, arr) {
    // debugger;
    if (!(outcomesRun === Math.pow(n, n))) {
      if (obj === n - 1 && arr === n - 1) {
        if (!hasRowConflictAt(obj) &&
            !hasColConflictAt(arr)) {
          solution[obj][arr] = 1;
          solutionCount++;
          // moved outside
          outcomesRun++;
          piecesPlayed = 0;
          resetBoard();
        }
      } else {
        if (hasRowConflictAt(obj) ||
            hasColConflictAt(arr)) {
          // moved outside
          outcomesRun++;
          piecesPlayed = 0;
          resetBoard();
          // break;
        } else {
          solution[obj][arr] = 1;
          piecesPlayed++;
          if (piecesPlayed === n) {
            solutionCount++;
            // moved outside
            outcomesRun++;
            piecesPlayed = 0;
            resetBoard();
            // break;
          }
          var objIndex = obj;
          var arrIndex = arr;
          if (arrIndex === n - 1) {
            objIndex++;
            arrIndex = 0;
          } else {
            arrIndex++;
          }
          return loop(objIndex, arrIndex);
        }
      }
    } else {
      return solutionCount;
    }
  };

  loop(0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
