import React, { useState, useEffect, useRef } from 'react';
import { useHotkeys } from "react-hotkeys-hook";
import useSound from 'use-sound';
import * as Icon from 'react-feather';
import { countriesENG, countriesRU } from "../countries";
import button from '../media/sounds/button.mp3';
import backgroundMusic from '../media/sounds/backgroundMusic.mp3';
import MusicSettingsPanel from "./MusicSettingsPanel/MusicSettingsPanel";
import Statistics from "./Statistics";
import './styles.scss';

const Game = () => {
	const [lang, setLang] = useState(false);
	const getRandomCountry = () => Math.floor(Math.random() * (lang ? countriesRU : countriesENG).length);
	const [answers, setAnswers] = useState([]);
	const [rightAnswer, setRightAnswer] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [onGetAnswer, setOnGetAnswer] = useState(false);
	const [scores, setScores] = useState(9);
	const [isSounds, setIsSounds] = useState(false);
	const [isMusic, setIsMusic] = useState(false);
	const [isSettings, setIsSettings] = useState(false);
	const [isHint, setIsHint] = useState(false);
	const [isHelp, setIsHelp] = useState(false);
	const [clickSound] = useSound(isSounds ? button : null, { volume: 0.25 });
	const [isStatsOpened, setIsStatsOpened] = useState(false);
	const statsRows = [];
	const [statistics, setStatistics] = useState({
		name: '',
		rightCount: 0,
		wrongCount: 0,
		skipped: 0,
		status: ''
	});
	const musicRef = useRef();
	const [levelResult, setLevelResult] = useState({
		status: false,
		text: ''
	});
	
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
	}, [answers, lang]);
	
	useEffect(() => {
		if (scores >= 9 || scores <= -9) statsRows.push(statistics);
	}, [scores, statistics]);
	console.log(statsRows)
	
	const setRandomAnswers = () => {
		let arr = [];
		for (let i = arr.length; i < 4; i++) arr.push((lang ? countriesRU : countriesENG)[getRandomCountry()]);
		setAnswers(arr);
		setRightAnswer(Math.floor(Math.random() * 4))
	};
	
	const nextLevel = prop => {
		setRandomAnswers();
		setRightAnswer(Math.floor(Math.random() * 4));
		setIsHint(false);
		setIsStatsOpened(false);
		prop && setScores(prev => prev - 2);
		prop && setStatistics({...statistics, skipped: statistics.skipped + 1 });
	};

	const onChooseAnswer = index => {
		setSelectedAnswer(index);
		setIsStatsOpened(false);
		if (rightAnswer === index) {
			setOnGetAnswer(true);
			setTimeout(() => {
				setLevelResult({ status: true, text: !lang ? 'Right' : 'Правильно' });
				setStatistics({...statistics, rightCount: statistics.rightCount + 1 });
				setScores(prev => prev + 1);
				setTimeout(() => {
					setOnGetAnswer(false);
					setLevelResult({ status: false, text: '' });
					setIsHint(false);
					if (scores < 9 && scores > -9) nextLevel();
				}, 1500)
			}, 1500);
		}
		else {
			setOnGetAnswer(true);
			setTimeout(() => {
				setLevelResult({ status: true, text: !lang ? 'Wrong' : 'Неправильно' });
				setStatistics({...statistics, wrongCount: statistics.wrongCount + 1 });
				setScores(prev => prev - 1);
				setTimeout(() => {
					setOnGetAnswer(false);
					setLevelResult({ status: false, text: '' });
				}, 1500)
			}, 1500);
		}
	};
	
	const restartGame = () => {
		nextLevel();
		setScores(0);
		setIsHint(false);
		setIsStatsOpened(false);
	};
	
	const onClickHint = () => {
		if (!isHint) setScores(prev => prev - 1);
		setIsHint(prev => !prev);
		setIsStatsOpened(false);
	};
	
	const onChangeLang = () => {
		setLang(!lang);
		setAnswers([]);
		setIsStatsOpened(false);
		if (isHint) setIsHint(false);
	};
	
	const onClickSettings = () => {
		setIsSettings(!isSettings);
		setIsHelp(false);
	};
	
	const renderGameResult = () => {
		if (scores >= 10) return <div className="game_result game_result__win">You Win</div>;
		else if (scores <= -10) return <div className="game_result game_result__lost">You lost</div>
	};
	
	useHotkeys('n', () => nextLevel('skip')); //skip round
	useHotkeys('r', () => restartGame()); //restart game
	useHotkeys('l', () => setLang(prev => !prev)); //change language
	useHotkeys('s', () => setIsStatsOpened(prev => !prev)); //show statistics
	useHotkeys('m', () => { // enable/disable music and sounds
		setIsSounds(prev => !prev);
		setIsMusic(prev => !prev);
	});
	
	return <div className="wrapper">
		<audio loop ref={musicRef} src={backgroundMusic}/>
		
		<div className="content_box">
			<div className="buttons top_buttons__box">
				<div className="df">
					<button className="top__btn" onMouseDown={clickSound} onClick={() => onClickSettings()}>
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
						<button className="top__btn mr5" onMouseDown={clickSound} onClick={() => setIsHelp(!isHelp)}>
							<Icon.HelpCircle/>
						</button>
					</div>
					
					<div className={`lang_box ${!isSettings && 'hidden'}`}>
						<button className={`top__btn ${(scores >= 10 || scores <= -10 || onGetAnswer === true) ? 'disabled' : null}`}
						        onMouseDown={clickSound}
						        onClick={() => onChangeLang()}
						>
							{lang ? 'RU' : 'ENG'}
						</button>
					</div>
				</div>
				
				<div className="df">
					<div className="hint_box">
						{isHint && <div className={`hint_text ${isSettings && 'hint_absolute'}`}><span>{answers[rightAnswer].hint}</span></div>}
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
						<Icon.RefreshCcw/>
					</button>
					
					<button className={`top__btn ${(scores >= 10 || scores <= -10 || onGetAnswer === true) ? 'disabled' : null}`}
					        onMouseDown={clickSound}
					        onClick={() => nextLevel('skip')}
					>
						<Icon.ChevronsRight/>
					</button>
				</div>
			</div>
			
			{isHelp && <div className="help_box">
				<div className="help_item buttons mb5">
					<button><Icon.Volume2/></button>
					- On/Off music(M)
				</div>
				<div className="help_item buttons mb5">
					<button><Icon.Bell/></button>
					- On/Off sound(M)
				</div>
				<div className="help_item buttons mb5">
					<button className="top__btn">ENG</button>
					- Change language(L)
				</div>
				<div className="help_item buttons mb5">
					<button><Icon.AlertCircle/></button>
					- Hint
				</div>
				<div className="help_item buttons mb5">
					<button><Icon.RefreshCcw/></button>
					- Restart game(R)
				</div>
				<div className="help_item buttons mb5">
					<button><Icon.ChevronsRight/></button>
					- Skip round(N)
				</div>
				<div className="help_item buttons mb5">
					<button><Icon.List/></button>
					- Statistics(S)
				</div>
			</div>}
			
			<span className="scores">{scores}/10</span>
			
			<div className="country_field">
				<img className="country_img"
				     src={process.env.PUBLIC_URL + `./img/countries/${answers[rightAnswer]?.value}.png`}
				     alt=""/>
			</div>
			
			{levelResult.status
			 ? <span className={`result_text ${(levelResult.text === 'Right' || levelResult.text === 'Правильно') ? 'success' : 'error'}`}>
				 {levelResult.text}
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
			
			<div className="statistics_box">
				<button className="statistics_btn"
				        onClick={() => setIsStatsOpened(!isStatsOpened)}
				        onMouseDown={clickSound}
				>
					<Icon.List/>
				</button>
				{isStatsOpened && <Statistics rows={statsRows}/>}
			</div>
		</div>
		
		{renderGameResult()}
	</div>;
};

export default Game;
