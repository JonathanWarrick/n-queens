// n = 4; Rooks
// Loop through the board placing the first rook in each position
  // at each position, loop through the second rook in each position
  // fails test if
    // second rook has same position as first rook
    // second rook's x-coordinate matches first rook's ([x,y])
    // second rook's y-coordinate matches first rook's ([x,y])
  // else, place rook
    // for each pass of second rook,
    // loop through third rook in each position
      // repeat above three conditions,
      // checking them for both first and second rook
      // if fails,
        // move on to next iteration
      // else, place rook
        // for each pass of third rook,
        // loop through fourth rook in each position
          // repeat above three conditions,
          // checking them for all three prior rooks
          // if fails,
            // nothing
          // else, place rook and increment return n


// Things to note for optimization:
  // When we get down to a 2x2 box, there are two possible boards
  // Don't have to be next to each other

var rookFinder = function() {
  // will store passing outcomes after all tests are passed
  var outcomes = [];

  // store each individual combination to be tested
  // var tempOutcome = [];

  for(var i = 0; i < 9; i++){
    if(i <= 6){
      var firstRook = i;
      // tempOutcome[i] = 1;
      for(var j = i + 1; j < 9; j++){
        // tempOutcome[j] = 1;
        var secondRook = j;
        for(var k = j+1; k < 9; k++){
          // tempOutcome[k] = 1;
          // outcomes.push(tempOutcome);
          // tempOutcome.pop();
          var thirdRook = k;
          var outcomeArray = [0,0,0,0,0,0,0,0,0];
          outcomeArray[i] = 1;
          outcomeArray[j] = 1;
          outcomeArray[k] = 1;
          outcomes.push(outcomeArray);
        }
      }
    }
  }

  var passingOutcomes = [];
  debugger;
  for (var i = 0; i < outcomes.length; i++) {
    if (rowCollision(outcomes[i]) === false &&
        columnCollision(outcomes[i]) === false)  {
      passingOutcomes.push(outcomes[i]);
    }
  }

  return passingOutcomes;
};

// test for row collision
var rowCollision = function(outcome) {
  var rowCollision = false;

  if ((outcome[0] + outcome[1] + outcome[2]) > 1 ||
      (outcome[3] + outcome[4] + outcome[5]) > 1 ||
      (outcome[6] + outcome[7] + outcome[8]) > 1) {
    rowCollision = true;
  }
  return rowCollision;
};

// test for row collision
var columnCollision = function(outcome) {
  var columnCollision = false;

  if ((outcome[0] + outcome[3] + outcome[6]) > 1 ||
      (outcome[1] + outcome[4] + outcome[7]) > 1 ||
      (outcome[2] + outcome[5] + outcome[8]) > 1) {
    columnCollision = true;
  }
  return columnCollision;
};

