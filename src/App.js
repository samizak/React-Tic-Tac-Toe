import "./App.css";
import { useState } from "react";

// Reset the game with default values
function handleReset({ setSquares, setIsX, setStatusText, setGameOver, setIsTie }) {
  setSquares(Array(9).fill(null));
  setIsX(true);
  setStatusText("Next player: X");
  setGameOver(false);
  setIsTie(false);
}

function Square({ onClick, value }) {
  return (
    <div className="square" onClick={onClick}>
      <div className={value}></div>
    </div>
  );
}

function CalculateWinner(squares) {
  const winningPatterns = [
    // Horizontal wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical Wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal Wins
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [statusText, setStatusText] = useState("Next player: X");

  const [gameOver, setGameOver] = useState(false);
  const [isTie, setIsTie] = useState(false);

  const handleClick = (i) => {
    if (CalculateWinner(squares) || squares[i]) return;

    squares[i] = isX ? "X" : "O";

    setSquares(squares);
    setIsX(!isX);

    const winner = CalculateWinner(squares);
    let isTie = squares.every((e) => e !== null);

    if (isTie || winner) {
      setGameOver(true);
      setIsTie(isTie);
      setStatusText(isTie ? "No Winner!" : "Winner!");

      return;
    }

    setStatusText("Next player: " + (!isX ? "X" : "O"));
  };

  return (
    <div className="app">
      <h1>TIC-TAC-TOE</h1>
      <div>
        <div className="board">
          {[...Array(9).fill(0)].map((_, i) => (
            <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
          ))}
        </div>

        <div className="status">{statusText}</div>

        <button className="new-game" onClick={() => handleReset({ setSquares, setIsX, setStatusText, setGameOver, setIsTie })}>
          New Game
        </button>

        {gameOver && (
          <div className="popup-result">
            <div className="result">
              <h2>{statusText}</h2>

              {!isTie && (
                <div className="winner">
                  <div className="square">
                    <div className={!isX ? "X" : "O"}></div>
                  </div>
                </div>
              )}

              <button className="new-game" onClick={() => handleReset({ setSquares, setIsX, setStatusText, setGameOver, setIsTie })}>
                New Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
