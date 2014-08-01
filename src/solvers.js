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

var findSolution = function(n, row, board, pieceCheck, callback){

  if(row === n){
    return callback();
  } else {
    for(var i = 0; i < n; i++){
      // if (n === 3 && row === 2 && i === 1 && pieceCheck === "hasAnyQueensConflicts") {
      //   debugger;
      // }
      board.togglePiece(row, i);
      if(!board[pieceCheck]()){
        var output = findSolution(n, row+1, board, pieceCheck, callback);
        if(output) { return output; }
        // return the board
      }
      board.togglePiece(row, i);
    }
  }

};


// if no children === return 1
// else test if there are conflicts
  // if conflict return 0
  // else recurse


window.findNRooksSolution = function(n) {
  var board = new Board({n:n});

  var solution = findSolution(n, 0, board, "hasAnyRooksConflicts", function(){
    return board.rows();
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n:n});

  findSolution(n, 0, board, "hasAnyRooksConflicts", function(){
    solutionCount++;
  });




  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //debugger;
  var board = new Board({n:n});
  var solution = board.rows();
  // if (n === 2) {
  //   solution = board.rows();
  // }
  // if (n === 3) {
  //   solution = [[],[],[]];
  // } else {
  findSolution(n, 0, board, "hasAnyQueensConflicts", function(){

    return board.rows();
    });
  // }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;

  var board = new Board({n:n});

  findSolution(n, 0, board, "hasAnyQueensConflicts", function(){
if(n===3){
    //debugger;
  }
    solutionCount++;
  });
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

/*
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
 */




// pieces played varable = 0
// function(pieces played, index)
  // build logic to move to next row starting at index 0

  // (IF) test if the piece can be placed
    // if success increment pieces play
  // test if pieces played === n
    // if true
      // increase counter of solutions
    // else
      // recurse (n - pieces played as the argument, 0)
  // try to place piece one index to the right
  // temporarily decrement pieces played by one
  // if success move (index+1 is not greater than n)
    // increment pieces played by one
  // if index+1 > n
    //  return (delete last piece played and decrement pieces played)
  // else
    // recurse (n - pieces played, index+1)
  // return
// call function(0, 0)
