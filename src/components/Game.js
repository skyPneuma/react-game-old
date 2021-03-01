import React, { useState, useEffect, useRef } from 'react';
import { useHotkeys } from "react-hotkeys-hook";
import useSound from 'use-sound';
import * as Icon from 'react-feather';
import { countriesENG, countriesRU } from "../countries";
import button from '../media/sounds/button.mp3';
import backgroundMusic from '../media/sounds/backgroundMusic.mp3';
import MusicSettingsPanel from "./MusicSettingsPanel/MusicSettingsPanel";
import './styles.scss';

const Game = () => {
	const [lang, setLang] = useState(true);
	const getRandomCountry = () => Math.floor(Math.random() * (lang ? countriesRU : countriesENG).length);
	const [answers, setAnswers] = useState([]);
	const [rightAnswer, setRightAnswer] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [onGetAnswer, setOnGetAnswer] = useState(false);
	const [scores, setScores] = useState(0);
	const [isSounds, setIsSounds] = useState(false);
	const [isMusic, setIsMusic] = useState(false);
	const [isSettings, setIsSettings] = useState(false);
	const [showHint, setShowHint] = useState(false);
	const [clickSound] = useSound(isSounds ? button : null, { volume: 0.25 });
	const musicRef = useRef();
	const [result, setResult] = useState({
		status: false,
		text: ''
	});
	
	document.addEventListener('click', () => musicRef.current?.play());
	
	useEffect(() => {
		if (musicRef.current) musicRef.current.volume = isMusic ? +isMusic : 0;
	}, [isMusic]);
	
	useEffect(() => {
		let arr = [];
		if (answers.length < 4) {
			for (let i = arr.length; i < 4; i++) arr.push((lang ? countriesRU : countriesENG)[getRandomCountry()]);
			setAnswers(arr);
			setRightAnswer(Math.floor(Math.random() * 4))
		}
	}, [answers, getRandomCountry]);
	
	const setRandomAnswers = () => {
		let arr = [];
		for (let i = arr.length; i < 4; i++) arr.push((lang ? countriesRU : countriesENG)[getRandomCountry()]);
		setAnswers(arr);
		setRightAnswer(Math.floor(Math.random() * 4))
	};
	
	const nextLevel = prop => {
		setRandomAnswers();
		setRightAnswer(Math.floor(Math.random() * 4));
		setShowHint(false);
		prop && setScores(prev => prev - 1);
	};
	
	const onChooseAnswer = index => {
		setSelectedAnswer(index);
		if (rightAnswer === index) {
			setOnGetAnswer(true);
			setTimeout(() => {
				setResult({ status: true, text: 'Right' });
				setScores(prev => prev + 1);
				setTimeout(() => {
					setOnGetAnswer(false);
					setResult({ status: false, text: '' });
					setShowHint(false);
					nextLevel();
				}, 1500)
			}, 1500);
		}
		else {
			setOnGetAnswer(true);
			setTimeout(() => {
				setResult({ status: true, text: 'Wrong' });
				setScores(prev => prev - 1);
				setTimeout(() => {
					setOnGetAnswer(false);
					setResult({ status: false, text: '' });
				}, 1500)
			}, 1500);
		}
	};
	
	const restartGame = () => {
		nextLevel();
		setScores(0);
		setShowHint(false);
	};
	
	const onClickHint = () => {
		if (!showHint) setScores(prev => prev - 1);
		setShowHint(!showHint);
	};
	
	useHotkeys('n', () => nextLevel('skip'));
	useHotkeys('r', () => restartGame());
	useHotkeys('l', () => setLang(prev => !prev));
	useHotkeys('m', () => {
		setIsSounds(prev => !prev);
		setIsMusic(prev => !prev);
	});
	
	return <div className="wrapper">
		<audio loop ref={musicRef} src={backgroundMusic}/>
		
		<div className="content_box">
			<div className="buttons top_buttons__box">
				<div className="df">
					<button className="top__btn" onMouseDown={clickSound} onClick={() => setIsSettings(!isSettings)}>
						<Icon.Settings/>
					</button>
					
					<div className={`sounds_icon_box ${!isSettings && 'hidden'}`}>
						<div className="sounds_icon" onMouseDown={isSounds ? clickSound : null}>
							{isMusic
							 ? <Icon.Volume2 onClick={() => setIsMusic(!isMusic)}/>
							 : <Icon.VolumeX onClick={() => setIsMusic(!isMusic)}/>}
							<MusicSettingsPanel musicRef={musicRef}/>
						</div>
						<div className="sounds_icon" onClick={() => setIsSounds(!isSounds)} onMouseDown={isSounds ? clickSound : null}>
							{isSounds ? <Icon.Bell/> : <Icon.BellOff/>}
						</div>
					</div>
					
					<div className={`${!isSettings && 'hidden'}`}>
						<button className="top__btn mr5" onMouseDown={clickSound} onClick={() => console.log("Help")}>
							<Icon.HelpCircle/>
						</button>
					</div>
					
					<div className={`${!isSettings && 'hidden'}`}>
						<button className="top__btn" onMouseDown={clickSound} onClick={() => setLang(!lang)}>
							{lang ? 'RU' : 'ENG'}
						</button>
					</div>
				</div>
				
				<div className="df">
					<div className="hint_box">
						{showHint && <div className="hint_text"><span>{answers[rightAnswer].hint}</span></div>}
						<button className={`top__btn ${(scores >= 10 || scores <= -10 || onGetAnswer === true) ? 'disabled' : null}`}
						        onMouseDown={clickSound}
						        onClick={() => onClickHint()}
						>
							<Icon.AlertCircle/>
						</button>
					</div>
					
					<button className={`top__btn ${onGetAnswer ? 'disabled' : null}`}
					        onClick={() => restartGame()}
					        onMouseDown={clickSound}
					>
						<Icon.RotateCcw/>
					</button>
					
					<button className={`top__btn ${(scores >= 10 || scores <= -10 || onGetAnswer === true) ? 'disabled' : null}`}
					        onMouseDown={clickSound}
					        onClick={() => nextLevel('skip')}
					>
						<Icon.ChevronsRight/>
					</button>
				</div>
			</div>
			
			<span className="scores">{scores}/10</span>
			
			<div className="country_field">
				<img className="country_img"
				     src={process.env.PUBLIC_URL + `./img/countries/${answers[rightAnswer]?.value}.png`}
				     alt=""/>
			</div>
			
			{result.status === true
			 ? <span className={`result_text ${result.text === 'Right' ? 'success' : 'error'}`}>
				 {result.text}
			</span>
			 : null}
			
			<div className="buttons buttons_bottom">
				{answers.map((item, index) =>
					<button onClick={() => onChooseAnswer(index)}
					        key={index}
					        onMouseDown={clickSound}
					        className={`buttons__answer ${(scores >= 10 || scores <= -10 || onGetAnswer) ? 'disabled' : ''}
					        ${onGetAnswer && selectedAnswer === index ? 'onGetAnswer_btn' : ''}`}
					>
						{item.label}
					</button>)}
			</div>
		</div>
	</div>;
};

export default Game;
