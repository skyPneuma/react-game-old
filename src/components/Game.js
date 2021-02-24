import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { countries } from "../countries";
import styles from './styles.scss';

const Game = () => {
	const getRandomCountry = () => Math.floor(Math.random() * countries.length);
	
	const [answers, setAnswers] = useState([]);
	const [rightAnswer, setRightAnswer] = useState(null);
	const [scores, setScores] = useState(0);
	
	useEffect(() => {
		let arr = [];
		if (answers.length < 4){
			for (let i = arr.length; i < 4; i++) arr.push(countries[getRandomCountry()]);
			setAnswers(arr);
			setRightAnswer(Math.floor(Math.random() * 4))
		}
	}, [answers]);
	
	const setRandomAnswers = () => {
		let arr = [];
		for (let i = arr.length; i < 4; i++) arr.push(countries[getRandomCountry()]);
		setAnswers(arr);
		setRightAnswer(Math.floor(Math.random() * 4))
	};
	
	const nextLevel = () => {
		setRandomAnswers();
		setRightAnswer(Math.floor(Math.random() * 4))
	};
	
	const onChooseAnswer = index => {
		if(rightAnswer === index) {
			nextLevel();
			setScores(scores + 2);
			console.log('right answer')
		} else {
			setScores(scores - 1);
			console.log('wrong')
		}
	};
	
	const restartGame = () => {
		setScores(0);
		
	};

	return <div className="wrapper">
		<div className="content_box">
			<div className="buttons top_buttons__box">
				<button className="top__btn" onClick={() => restartGame()}>Restart game</button>
				<span>{scores}</span>
				<button className="top__btn">Hint</button>
				<button className="top__btn" onClick={() => nextLevel()}>Skip round</button>
			</div>
			<div className="country_field">
				<img className="country_img" src={process.env.PUBLIC_URL + `./img/countries/${answers[rightAnswer]?.value}.png`} alt=""/>
			</div>
			<div className="buttons buttons_bottom">
				{answers.map((item, index) => <button onClick={() => onChooseAnswer(index)} key={index} className="btn__answer">{item.label}</button>)}
			</div>
		</div>
	</div>;
};

export default Game;
