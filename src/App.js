import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
  <button className="square" onClick={onSquareClick}>
    {value}
  </button>
  );
}

function Board({ redIsNext, squares, onPlay }) {

  function handleClick(i) {

    // Player's turn
    if(redIsNext) {
      // If the user clicks on the same square again, do nothing OR if someone wins, end the game
      if (squares[i] || calculateWinner(squares)) {
        return;
      }

      // Emulates the falling of the red and yellow pieces
      const nextSquares = squares.slice();
      while(nextSquares[i+7] === null && (i+7) <= 41) {
        i += 7;
      }

      // Switches colours every turn
      if (redIsNext) {
        nextSquares[i] = "🔴";
      } else {
        nextSquares[i] = "🟡";
      } 
      onPlay(nextSquares);
    
    // Bot's turn
    } else {

      // Ensures the bot does not try to make a move if the player wins or if the board is filled (should not happen)
      if (calculateWinner(squares) || allValidMoves(squares).length === 0) {
        return;
      }

      const minimaxReturn = minimax(squares, 6, -Infinity, Infinity, true);
      var col = minimaxReturn[0];
      var minimaxScore = minimaxReturn[1];

      if (squares[col] === null) {

        // Simulates falling of the pieces
        const nextSquares = squares.slice();
        while(nextSquares[col+7] === null && (col+7) <= 41) {
          col += 7;
        }

        nextSquares[col] = "🟡";
        onPlay(nextSquares);
      }
    }
  }


  const winner = calculateWinner(squares);
  const tied = isGameTied(squares);
  let status;

  // If there is a winner or tie, show that the game ended, otherwise, continue the game
  if (winner) {
    status = "Winner: " + winner;
  } else if (tied) {
    status = "Both players tied.";
  } else {
      if (redIsNext) {
        status = "Your turn: 🔴";
      } else {
          status = "Bot's turn: 🟡 (Please click to proceed to your turn.)";
      }
    
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
        <Square value={squares[10]} onSquareClick={() => handleClick(10)} />
        <Square value={squares[11]} onSquareClick={() => handleClick(11)} />
        <Square value={squares[12]} onSquareClick={() => handleClick(12)} />
        <Square value={squares[13]} onSquareClick={() => handleClick(13)} />
      </div>
      <div className="board-row">
        <Square value={squares[14]} onSquareClick={() => handleClick(14)} />
        <Square value={squares[15]} onSquareClick={() => handleClick(15)} />
        <Square value={squares[16]} onSquareClick={() => handleClick(16)} />
        <Square value={squares[17]} onSquareClick={() => handleClick(17)} />
        <Square value={squares[18]} onSquareClick={() => handleClick(18)} />
        <Square value={squares[19]} onSquareClick={() => handleClick(19)} />
        <Square value={squares[20]} onSquareClick={() => handleClick(20)} />
      </div>
      <div className="board-row">
        <Square value={squares[21]} onSquareClick={() => handleClick(21)} />
        <Square value={squares[22]} onSquareClick={() => handleClick(22)} />
        <Square value={squares[23]} onSquareClick={() => handleClick(23)} />
        <Square value={squares[24]} onSquareClick={() => handleClick(24)} />
        <Square value={squares[25]} onSquareClick={() => handleClick(25)} />
        <Square value={squares[26]} onSquareClick={() => handleClick(26)} />
        <Square value={squares[27]} onSquareClick={() => handleClick(27)} />
      </div>
      <div className="board-row">
        <Square value={squares[28]} onSquareClick={() => handleClick(28)} />
        <Square value={squares[29]} onSquareClick={() => handleClick(29)} />
        <Square value={squares[30]} onSquareClick={() => handleClick(30)} />
        <Square value={squares[31]} onSquareClick={() => handleClick(31)} />
        <Square value={squares[32]} onSquareClick={() => handleClick(32)} />
        <Square value={squares[33]} onSquareClick={() => handleClick(33)} />
        <Square value={squares[34]} onSquareClick={() => handleClick(34)} />
      </div>
      <div className="board-row">
        <Square value={squares[35]} onSquareClick={() => handleClick(35)} />
        <Square value={squares[36]} onSquareClick={() => handleClick(36)} />
        <Square value={squares[37]} onSquareClick={() => handleClick(37)} />
        <Square value={squares[38]} onSquareClick={() => handleClick(38)} />
        <Square value={squares[39]} onSquareClick={() => handleClick(39)} />
        <Square value={squares[40]} onSquareClick={() => handleClick(40)} />
        <Square value={squares[41]} onSquareClick={() => handleClick(41)} />
      </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(42).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const redIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Handles the current moves
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Jumps to a specific move
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Function to undo move by utilizing history
  function undoMove() {
    if(history.length > 1) {
      setCurrentMove(history.length - 2);
      const nextHistory = [...history.slice(0, currentMove)];
      setHistory(nextHistory);
    } 
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board redIsNext={redIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button className="game-button" onClick={() => jumpTo(0)}>{"Reset the game."}</button>
        <button className="game-button" onClick={() => undoMove()}>{"Undo"}</button>
      </div>
    </div>
  );
}

function count(array, value) {
  var occurrences = 0;
  for(let i = 0; i < array.length; i++) {
    if(array[i] === value) {
      occurrences++;
    }
  }
  
  return occurrences;
}

function getScore(positionOne, positionTwo, positionThree, positionFour, colour) {
  const positions = [positionOne, positionTwo, positionThree, positionFour];
  var oppColour = "";

  if(colour === "🟡") {
    oppColour = "🔴";
  } else {
    oppColour = "🟡";
  }

  // Four in a row (Connect Four)
  if(count(positions, colour) === 4) {
    return 100;
  // Three out of four and one empty
  } else if(count(positions, colour) === 3 && count(positions, null) === 1) {
    return 5;
  // Two out of four and two empty
  } else if(count(positions, colour) === 2 && count(positions, null) === 2) {
    return 2;
  // Opponent has three out of four and one empty
  } else if(count(positions, oppColour) === 3 && count(positions, null) === 1) {
    return -4;
  }
  
  return 0;
}

// Function to determine overall score of the board
function heuristic(board, colour) {
  var score = 0;

  // Center column
  for(let i = 0; i < 6; i++) {
    if(board[3 + i*7] === colour) {
      score += 3;
    }
  }
  
  // Horizontal checks
  for(let i = 0; i < 6; i++) {
    for(let j = 0; j < 4; j++) {
      score += getScore(board[7*i + j], board[7*i + j+1], board[7*i + j+2], board[7*i + j+3], colour);
    }
  }

  // Vertical checks
  for(let i = 0; i < 7; i++) {
    for(let j = 0; j < 3; j++) {
      score += getScore(board[7*j + i], board[7*j + i+7], board[7*j + i+14], board[7*j + i+21], colour);
    }
  }

  // Diagonal checks (from top-left to bottom-right)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      score += getScore(board[7*i + j], board[7*i + j+8], board[7*i + j+16], board[7*i + j+24], colour);
    }
  }

  // Diagonal checks (from top-right to bottom-left)
  for (let i = 0; i < 3; i++) {
    for (let j = 6; j > 2; j--) {
      score += getScore(board[7*i + j], board[7*i + j+6], board[7*i + j+12], board[7*i + j+18], colour);
    }
  }

  return score;
}

// Calculates the winner (if there is one)
function calculateWinner(squares) {
  const lines = [];

  // Accounts for every way to win horizontally
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      lines.push([i*7 + j, i*7 + j+1, i*7 + j+2, i*7 + j+3]);
    }
  }

  // Accounts for every way to win vertically
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 3; j++) {
      lines.push([i+j*7, i+j*7+7, i+j*7+14, i+j*7+21]);
    }
  }

  // Accounts for every way to win diagonally (from top-left to bottom-right)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      lines.push([i*7+j, i*7+j+8, i*7+j+16, i*7+j+24]);
    }
  }

  // Accounts for every way to win diagonally (from top-right to bottom-left)
  for (let i = 0; i < 3; i++) {
    for (let j = 6; j > 2; j--) {
      lines.push([i*7+j, i*7+j+6, i*7+j+12, i*7+j+18]);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
      return squares[a];
    }
  }
  return null;

}

// Checks if the game is tied
function isGameTied(board) {
  for(let i = 0; i < board.length; i++) {
    if(board[i] === null) {
      return false;
    }
  }
  return true;
}

// Shows all valid moves
function allValidMoves(board) {
  const allMoves = [];
  for(let i = 0; i < 7; i++) {
    if(board[i] === null)
    allMoves.push(i);
  }

  return allMoves;

}

// The actual minimax algorithm
function minimax(board, depth, alpha, beta, maximizingPlayer) {
	const validLocations = allValidMoves(board);
	var isTerminal = isGameTied(board) || calculateWinner(board) != null;

	if (depth === 0 || isTerminal) {
		if (isTerminal) {
      // Bot wins
			if (calculateWinner(board) === "🟡") {
				return [null, 100000000000000];
      // Player wins
      } else if (calculateWinner(board) === "🔴") {
				return [null, -10000000000000];
      // Game is over
      } else {
				return [null, 0];
      }
    // Depth is zero
    } else {
			return [null, heuristic(board, "🟡")];
    }
  } 

  // Maximizing player
	if (maximizingPlayer) {
		var value = -Infinity;
		var column = validLocations[Math.floor(Math.random() * validLocations.length)]
		for(let i = 0; i < validLocations.length; i++) {

      var temp = i;
	  const boardCopy = board.slice();
      while(boardCopy[temp+7] === null && (temp+7) <= 41) {
        temp += 7;
      }
      
      boardCopy[temp] = "🟡";

			var newScore = minimax(boardCopy, depth-1, alpha, beta, false)[1];
			if (newScore > value) {
				value = newScore;
				column = validLocations[i];
            }
			alpha = Math.max(alpha, value)
			if (alpha >= beta) {
				break;
      }
    }
		return [column, value];
  }

  // Minimizing player
	else {
		var value = Infinity;
		var column = validLocations[Math.floor(Math.random() * validLocations.length)]
		for(let i = 0; i < validLocations.length; i++) {

      var temp = i;
      const boardCopy = board.slice();
      while(boardCopy[temp+7] === null && (temp+7) <= 41) {
        temp += 7;
      }

      boardCopy[temp] = "🔴";

			var newScore = minimax(boardCopy, depth-1, alpha, beta, true)[1];
			if (newScore < value) {
				value = newScore;
				column = validLocations[i];
      }
			beta = Math.min(beta, value)
			if (alpha >= beta) {
				break;
      }
    }
		return [column, value];
  }
}