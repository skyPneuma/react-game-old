import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import './App.scss';
import Game from "./components/Game";
import StartGame from "./components/StartGame";

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<Route exact path="/" component={StartGame}/>
				<Route exact path="/game" component={Game}/>
			</div>
		</BrowserRouter>
	
	)
};

export default App;
