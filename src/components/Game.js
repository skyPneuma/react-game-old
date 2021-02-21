import React, { useState } from 'react';
import { calculateWinner } from "../helper";
import Board from "./Board";
import styles from './styles.scss';

const Game = () => {
	const pureBoard = Array(9).fill(null);
	const [board, setBoard] = useState(pureBoard);
	const [xIsNext, setXIsNext] = useState(true);
	const winner = calculateWinner(board);
	
	const handleClick = index => {
		const boardCopy = [...board];
		if (winner || boardCopy[index]) return;
		boardCopy[index] = xIsNext ? 'X' : "O";
		setBoard(boardCopy);
		setXIsNext(!xIsNext);
	};
	
	return <div className="wrapper">
		<button className="start__btn" onClick={() => setBoard(pureBoard)}>Clear board</button>
		<Board squares={board} onClick={handleClick}/>
		<p className="game__info">
			{winner ? winner + " is winner!" : "Now is " + (xIsNext ? 'X' : 'O') + " turn"}
		</p>
	</div>;
};

export default Game;
