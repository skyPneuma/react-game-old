import React, { useState, useEffect, useRef } from 'react';
import { useHotkeys } from "react-hotkeys-hook";
import useSound from 'use-sound';
import * as Icon from 'react-feather';
import { countries } from "../countries";
import button from '../media/sounds/button.mp3';
import backgroundMusic from '../media/sounds/backgroundMusic.mp3';
import MusicSettingsPanel from "./MusicSettingsPanel/MusicSettingsPanel";
import './styles.scss';

const Game = () => {
	const getRandomCountry = () => Math.floor(Math.random() * countries.length);
	const [answers, setAnswers] = useState([]);
	const [rightAnswer, setRightAnswer] = useState(null);
	const [scores, setScores] = useState(0);
	const [sounds, setSounds] = useState(false);
	const [music, setMusic] = useState(false);
	const [onGetAnswer, setOnGetAnswer] = useState(false);
	const [clickSound] = useSound(sounds ? button : null, { volume: 0.25 });
	const musicRef = useRef();
	
	document.addEventListener('click', () => musicRef.current?.play());
	
	useEffect(() => {
		if (musicRef.current) musicRef.current.volume = music ? +music : 0;
	}, [music]);
	
	useEffect(() => {
		let arr = [];
		if (answers.length < 4) {
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
	
	const nextLevel = prop => {
		setRandomAnswers();
		setRightAnswer(Math.floor(Math.random() * 4));
		prop && setScores(prev => prev - 1);
	};

	const onChooseAnswer = index => {
		if (rightAnswer === index) {
			setOnGetAnswer(true);
			setTimeout(() => {
				setScores(prev => prev + 1);
				nextLevel();
				setOnGetAnswer(false);
			}, 1000);
		}
		else {
			setOnGetAnswer(true);
			setTimeout(() => {
				setScores(prev => prev - 1);
				setOnGetAnswer(false);
			}, 1000);
			console.log('wrong')
		}
	};
	
	const restartGame = () => {
		nextLevel();
		setScores(0);
	};
	
	useHotkeys('s', () => nextLevel('skip'));
	useHotkeys('r', () => restartGame());
	useHotkeys('m', () => {
		setSounds(prev => !prev);
		setMusic(prev => !prev);
	});
	
	return <div className="wrapper">
		<audio loop ref={musicRef} src={backgroundMusic}/>
		
		<div className="content_box">
			<div className="buttons top_buttons__box">
				<button className="top__btn" onClick={() => restartGame()} onMouseDown={clickSound}>
					Restart game
				</button>
				
				<div className="sounds_icon_box">
					<div className="sounds_icon" onMouseDown={sounds ? clickSound : null}>
						{music ? <Icon.Volume2 onClick={() => setMusic(!music)}/> : <Icon.VolumeX onClick={() => setMusic(!music)}/>}
						<MusicSettingsPanel musicRef={musicRef}/>
					</div>
					<div className="sounds_icon" onClick={() => setSounds(!sounds)} onMouseDown={sounds ? clickSound : null}>
						{sounds ? <Icon.Bell/> : <Icon.BellOff/>}
					</div>
				</div>
				
				<button className={`top__btn ${scores >= 10 || scores <= -10 ? 'disabled' : null}`} onMouseDown={clickSound}>
					Hint
				</button>
				
				<button className={`top__btn ${scores >= 10 || scores <= -10 ? 'disabled' : null}`}
				        onMouseDown={clickSound}
				        onClick={() => nextLevel('skip')}
				>
					Skip round
				</button>
			</div>
			
			<span className="scores">{scores} /10</span>
			
			<div className="country_field">
				<img className="country_img"
				     src={process.env.PUBLIC_URL + `./img/countries/${answers[rightAnswer]?.value}.png`}
				     alt=""/>
			</div>
			
			<div className="buttons buttons_bottom">
				{answers.map((item, index) =>
					<button onClick={() => onChooseAnswer(index)}
					        key={index}
					        onMouseDown={clickSound}
					        className={`buttons__answer ${(scores >= 10 || scores <= -10) ? 'disabled' : ''} ${onGetAnswer === true ? 'onGetAnswer_btn' : ''}`}
					>
						{item.label}
					</button>)}
			</div>
		</div>
	</div>;
};

export default Game;
