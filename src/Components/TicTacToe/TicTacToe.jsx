import React, { useState, useRef, useEffect } from 'react';
import './TicTacToe.css';
import cross_icon from '../Assets/cross.png';
import circle_icon from '../Assets/circle.png';

export const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill("")); // State to store the board data
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null); // State to store the winner

  const titleRef = useRef(null); // Reference to the title element

  const toggle = (num) => {
    if (lock || data[num] !== "") {
      return;
    }
    const newData = [...data];
    newData[num] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    setCount(count + 1);
    if (checkWinner(newData, "x")) {
      setWinner("x");
      setLock(true); // Lock the board if there is a winner
    } else if (checkWinner(newData, "o")) {
      setWinner("o");
      setLock(true); // Lock the board if there is a winner
    } else if (count === 8) {
      setLock(true); // Lock the board if it's a tie
      setWinner("tie"); // Set winner to 'tie' if it's a tie
    }
  };

  const checkWinner = (board, player) => {
    // Winning conditions
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winningCombos.some(combo => combo.every(index => board[index] === player));
  };

  useEffect(() => {
    const displayWinnerMessage = () => {
      let message = "";
      let logo = "";
      if (winner === "x") {
        message = "<span>Congratulations! The winner is </span>";
        logo = cross_icon;
      } else if (winner === "o") {
        message = "<span>Congratulations! The winner is </span>";
        logo = circle_icon;
      } else if (winner === "tie") {
        message = "<span>It's a Tie!</span>";
      }
      titleRef.current.innerHTML = message;
      if (logo) {
        titleRef.current.innerHTML += `<img src="${logo}" alt="${winner}" />`;
      }
    };

    if (winner !== null) {
      displayWinnerMessage();
    }
  }, [winner]);

  const resetGame = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setWinner(null);
    titleRef.current.innerHTML = "Tic Tac Toe ";
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe </h1>
      <div className="board">
        <div className="row1">
          {data.slice(0, 3).map((value, index) => (
            <div key={index} className="boxes" onClick={() => toggle(index)}>
              {value === "x" && <img src={cross_icon} alt="Cross" />}
              {value === "o" && <img src={circle_icon} alt="Circle" />}
            </div>
          ))}
        </div>
        <div className="row2">
          {data.slice(3, 6).map((value, index) => (
            <div key={index + 3} className="boxes" onClick={() => toggle(index + 3)}>
              {value === "x" && <img src={cross_icon} alt="Cross" />}
              {value === "o" && <img src={circle_icon} alt="Circle" />}
            </div>
          ))}
        </div>
        <div className="row3">
          {data.slice(6, 9).map((value, index) => (
            <div key={index + 6} className="boxes" onClick={() => toggle(index + 6)}>
              {value === "x" && <img src={cross_icon} alt="Cross" />}
              {value === "o" && <img src={circle_icon} alt="Circle" />}
            </div>
          ))}
        </div>
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
