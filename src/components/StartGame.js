import React, { useState } from 'react';
import Game from "./Game";

const StartGame = () => {
	const startGame = () => <Game/>;
	return <div className="wrapper">
		<div className="blur">
			<div className="buttons_box">
				<button className="btn__start" onClick={() => startGame()}>Start game</button>
			</div>
		</div>
	</div>;
};

export default StartGame;
