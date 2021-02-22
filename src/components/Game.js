import React, { useState } from 'react';
import { countries } from "../countries";
import CountryField from "./CountryField";
import styles from './styles.scss';

const Game = () => {
	const [country, setCountry] = useState({
		"value": "AF",
		"label": "Afghanistan"
	});
	
	const getRandomCountry = () => {
		let rand = Math.floor(Math.random() * countries.length);
		return setCountry(countries[rand]);
	};
	
	return <div className="wrapper">
		<div className="blur">
			<div>
				<CountryField country={country}/>
			</div>
			<div className="buttons">
				<button className="btn__restart">Restart game</button>
				<button className="btn__hint">Hint</button>
				<button className="btn__skip" onClick={() => getRandomCountry()}>Skip round</button>
			</div>
		</div>
	</div>;
};

export default Game;
