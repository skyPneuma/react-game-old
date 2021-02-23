import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { countries } from "../countries";
import styles from './styles.scss';

const Game = () => {
	const getRandomCountry = () => Math.floor(Math.random() * countries.length);
	const [answers, setAnswers] = useState([]);
	const [country, setCountry] = useState(countries[getRandomCountry()]);
	
	const setRandomAnswers = () => {
		let arr = [];
		for (let i = arr.length; i < 4; i++) arr.push(countries[getRandomCountry()]);
		return setAnswers(arr);
	};
	
	const nextLevel = () => {
		setRandomAnswers();
		setCountry(countries[getRandomCountry()]);
	};
	console.log('country', country);
	return <div className="wrapper">
		<div className="content_box">
			<div className="buttons top_buttons__box">
				<Link to="/">
					<button className="top__btn">Restart game</button>
				</Link>
				<button className="top__btn">Hint</button>
				<button className="top__btn" onClick={() => nextLevel()}>Skip round</button>
			</div>
			<div className="country_field">
				<img className="country_img" src={process.env.PUBLIC_URL + `./img/countries/${country.value}.png`} alt=""/>
			</div>
			<div className="buttons buttons_bottom">
				{answers.map((item, index) => <button key={index} className="btn__answer">{item.label}</button>)}
			</div>
		</div>
	</div>;
};

export default Game;
