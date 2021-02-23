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
		<div className="content_box">
			<div className="buttons buttons_top">
				<button>Restart game</button>
				<button>Hint</button>
				<button onClick={() => getRandomCountry()}>Skip round</button>
			</div>
			<CountryField country={country}/>
			<div className="buttons buttons_bottom">
				<button className="btn__answer">Variant Variant 1</button>
				<button className="btn__answer">Variant Variant Variant Variant 2</button>
				<button className="btn__answer">Variant VariantVariant 3</button>
				<button className="btn__answer">Variant 4</button>
			</div>
		</div>
	</div>;
};

export default Game;
