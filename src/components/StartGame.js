import React from 'react';
import { Link } from "react-router-dom";

const StartGame = () => {
	return <div className="wrapper">
		<Link className="start_btn" to="/game">
			<div className="buttons">
				<button>Start game</button>
			</div>
		</Link>
	</div>;
};

export default StartGame;
