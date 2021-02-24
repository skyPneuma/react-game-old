import React, { useState } from "react";
import './App.scss';
import Game from "./components/Game";

const App = () => {
	const [currentPage, setCurrentPage] = useState('start');

	return (
		currentPage === 'start'
		? <div className="wrapper">
			<div className="buttons">
				<button onClick={() => setCurrentPage('game')}>Start game</button>
			</div>
		</div>
		: <Game />
	)
};

export default App;
