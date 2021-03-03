import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import useSound from "use-sound";
import Game from "./components/Game";
import git from "./media/images/git.png";
import rs_school_js from "./media/images/rs_school_js.svg";
import button from "./media/sounds/button.mp3";

const App = () => {
	const [currentPage, setCurrentPage] = useState('start');
	const [clickSound] = useSound(button, { volume: 0.5 });
	
	useHotkeys('s', () => setCurrentPage('game'));
	
	return (
		<div className="wrapper">
			{currentPage === 'start'
			 ?
			 <div className="buttons mb30">
				 <button onClick={() => setCurrentPage('game')} onMouseDown={clickSound}>Start game</button>
			 </div>
			
			 : <Game/>}
			<div className="footer_links_box">
				<span className="footer_year">2021</span>
				<a href="https://github.com/skyPneuma" target="_blank">
					<img className="link_img__git" src={git} alt=""/>
				</a>
				<a href="https://rs.school/js/" target="_blank">
					<img className="link_img__rs" src={rs_school_js} alt=""/>
				</a>
			</div>
		</div>
	)
};

export default App;
