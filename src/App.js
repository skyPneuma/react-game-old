import React, { useState } from "react";
import useSound from "use-sound";
import Game from "./components/Game";
import button from "./media/sounds/button.mp3";
import './App.scss';

const App = () => {
	const [currentPage, setCurrentPage] = useState('start');
	const [clickSound] = useSound(button, { volume: 0.5 });
	
	return (
		currentPage === 'start'
		? <div className="wrapper">
			<div className="buttons">
				<button onClick={() => setCurrentPage('game')} onMouseDown={clickSound}>Start game</button>
			</div>
		</div>
		: <Game />
	)
};

export default App;
