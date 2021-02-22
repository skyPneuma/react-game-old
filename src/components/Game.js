import React, { useState } from 'react';
import { countries } from "../countries";
import CountryField from "./CountryField";
import styles from './styles.scss';

const Game = () => {
	const randomCountry = Math.floor(Math.random() * countries.length);
	const [country, setCountry] = useState({
		"value": "AF",
		"label": "Afghanistan"
	});

	const getRandomCountry = () => setCountry(countries[randomCountry]);
	
	return <div className="wrapper">
		<div className="blur">
			<div className="buttons buttons_top">
				<button className="btn__restart">Restart game</button>
				<button className="btn__hint">Hint</button>
				<button className="btn__skip" onClick={() => getRandomCountry()}>Skip round</button>
			</div>
			<div>
				<CountryField country={country}/>
			</div>
			<div className="buttons buttons_bottom">
				<button className="btn__answer">VariantVariant 1</button>
				<button className="btn__answer">VariantVariantVariant Variant 2</button>
				<button className="btn__answer">Variant 3</button>
				<button className="btn__answer">Variant 4</button>
			</div>
		</div>
	</div>;
};

export default Game;
