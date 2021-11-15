import { calculateWinner } from "./index";

/**
 * minimax algorithm. Finds the best possible move for the current player
 * @param {array} squares game board array
 * @param {boolean} xIsNext current player
 * @returns {number} index of best possible move
 */
export function minimax(squares, xIsNext) {
  const moves = possibleMoves(squares);
  let bestAction;

  if (xIsNext) {
    let maxScore = -Infinity;
    moves.forEach((move) => {
      const newSquares = newState(squares, move, "X");
      let score = minValue(newSquares);
      if (score > maxScore) {
        maxScore = score;
        bestAction = move;
      }
    });
  } else {
    let minScore = Infinity;
    moves.forEach((move) => {
      const newSquares = newState(squares, move, "O");
      let score = maxValue(newSquares);
      if (score < minScore) {
        minScore = score;
        bestAction = move;
      }
    });
  }
  return bestAction;
}

/**
 * Generates new gameboard with the selected action taken.
 * @param {array} squares Game board array
 * @param {number} action game board index of next action
 * @param {string} player player (X or O)
 * @returns {array} new gameboard
 */
function newState(squares, action, player) {
  const newSquares = squares.slice();
  newSquares[action] = player;
  return newSquares;
}

/**
 *  This function calculates the value of of a game board in a terminal state
 * @param {string} terminalState result from calculate winner
 * @returns 1 for X win, 0 for draw, -1 for O win
 */
function getTerminalScore(terminalState) {
  switch (terminalState) {
    case "X":
      return 1;
    case "O":
      return -1;
    case "Draw":
      return 0;

    default:
      console.log("Error, unmatched switch in terminal score");
      break;
  }
}

/**
 * Calculates an array of possible moves from the game board.
 * @param squares game board array
 * @returns new list with indexes of possible moves.
 */
function possibleMoves(squares) {
  const moves = [];
  squares.map((player, index) => {
    if (player === null) {
      moves.push(index);
    }
    return null;
  });
  return moves;
}

/**
 * Subfunction of minimax, finds the lowest possible score for the remaining moves
 * @param {array} squares Game Board
 * @returns number
 */
function minValue(squares) {
  const terminalState = calculateWinner(squares);
  if (terminalState !== null) {
    return getTerminalScore(terminalState);
  }
  const moves = possibleMoves(squares);
  let score = Infinity;
  moves.forEach((action) => {
    const newSquares = newState(squares, action, "O");
    score = Math.min(score, maxValue(newSquares));
  });
  return score;
}

/**
 * Subfunction of minimax, finds the highest possible score for the remaining moves
 * @param {array} squares Game Board
 * @returns number
 */
function maxValue(squares) {
  const terminalState = calculateWinner(squares);
  if (terminalState !== null) {
    return getTerminalScore(terminalState);
  }
  const moves = possibleMoves(squares);
  let score = -Infinity;
  moves.forEach((action) => {
    const newSquares = newState(squares, action, "X");
    score = Math.max(score, minValue(newSquares));
  });
  return score;
}
