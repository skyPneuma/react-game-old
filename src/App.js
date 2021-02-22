import './App.scss';
import React from "react";
import Game from "./components/Game";
import StartGame from "./components/StartGame";

const App = () => {
	return (
		<div className="App">
			{/*<StartGame/>*/}
			<Game/>
		</div>
	)
};

export default App;
