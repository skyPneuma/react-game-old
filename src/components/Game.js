import React, { useState, useEffect, useRef } from 'react';
import { Maximize } from "react-feather";
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
	const musicRef = useRef();
	const [isSounds, setIsSounds] = useState(false);
	const [clickSound] = useSound(isSounds ? button : null, { volume: 0.1 });
	const [lang, setLang] = useState(false);
	const getRandomCountry = () => Math.floor(Math.random() * (lang ? countriesRU : countriesENG).length);
	const [answers, setAnswers] = useState([]);
	const [rightAnswer, setRightAnswer] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [onGetAnswer, setOnGetAnswer] = useState(false);
	const [scores, setScores] = useState(0);
	const [isMusic, setIsMusic] = useState(false);
	const [isSettings, setIsSettings] = useState(false);
	const [isHint, setIsHint] = useState(false);
	const [isHelp, setIsHelp] = useState(false);
	const [isStatsOpened, setIsStatsOpened] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const initialStats = localStorage.getItem('statistics');
	const [statistics, setStatistics] = useState(initialStats ? JSON.parse(initialStats) : []);
	const [statsTemplate, setStatsTemplate] = useState({
		rightCount: 0,
		wrongCount: 0,
		skipped: 0,
		status: null
	});
	const [levelResult, setLevelResult] = useState({
		status: false,
		text: ''
	});
	
	useEffect(() => {
		localStorage.setItem('statistics', JSON.stringify(statistics));
	}, [statistics]);
	
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
		if (scores >= 100 || scores <= -100) setIsGameOver(true);
		if (scores >= 100) setStatistics([{ ...statsTemplate, status: true }, ...statistics]);
		if (scores <= -100) setStatistics([{ ...statsTemplate, status: false }, ...statistics]);
	}, [scores]);
	
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
		prop && setScores(prev => prev - 20);
		prop && setStatsTemplate({ ...statsTemplate, skipped: statsTemplate.skipped + 1 });
	};
	
	const onChooseAnswer = index => {
		setSelectedAnswer(index);
		setIsStatsOpened(false);
		if (rightAnswer === index) {
			setOnGetAnswer(true);
			setTimeout(() => {
				setLevelResult({ status: true, text: !lang ? 'Right' : 'Правильно' });
				setStatsTemplate({ ...statsTemplate, rightCount: statsTemplate.rightCount + 1 });
				setScores(prev => prev + 10);
				setTimeout(() => {
					setOnGetAnswer(false);
					setLevelResult({ status: false, text: '' });
					setIsGameOver(false);
					setIsStatsOpened(true);
					setIsHint(false);
					if (scores < 90 && scores > -90) nextLevel();
				}, 2000)
			}, 1500);
		}
		else {
			setOnGetAnswer(true);
			setTimeout(() => {
				setLevelResult({ status: true, text: !lang ? 'Wrong' : 'Неправильно' });
				setStatsTemplate({ ...statsTemplate, wrongCount: statsTemplate.wrongCount + 1 });
				setScores(prev => prev - 10);
				setTimeout(() => {
					setOnGetAnswer(false);
					setLevelResult({ status: false, text: '' });
					setIsGameOver(false);
				}, 2000)
			}, 1500);
		}
	};
	
	const restartGame = () => {
		nextLevel();
		setScores(0);
		setIsHint(false);
		setIsStatsOpened(false);
		setStatsTemplate({
			rightCount: 0,
			wrongCount: 0,
			skipped: 0,
			status: null
		});
	};
	
	const onClickHint = () => {
		if (!isHint) setScores(prev => prev - 10);
		setIsHint(prev => !prev);
		setIsStatsOpened(false);
	};
	
	const onChangeLang = () => {
		setLang(prev => !prev);
		setAnswers([]);
		setIsHint(false);
	};
	
	const onClickSettings = () => {
		setIsSettings(!isSettings);
		setIsHelp(false);
	};
	
	useHotkeys('n', () => nextLevel('skip')); //skip round
	useHotkeys('r', () => restartGame()); //restart game
	useHotkeys('l', () => onChangeLang()); //change language
	useHotkeys('s', () => setIsStatsOpened(prev => !prev)); //show statistics
	useHotkeys('m', () => { // enable/disable music and sounds
		setIsSounds(prev => !prev);
		setIsMusic(prev => !prev);
	});
	
	const toggleFullscreen = () => {
		const isInFullScreen = document.fullscreenElement && document.fullscreenElement !== null;
		const docElm = document.documentElement;
		if (!isInFullScreen) {
			if (docElm.requestFullscreen) docElm.requestFullscreen();
		}
		else if (document.exitFullscreen) document.exitFullscreen();
	};
	
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
						<button className={`top__btn ${(scores >= 100 || scores <= -100 || onGetAnswer === true) ? 'disabled' : null}`}
						        onMouseDown={clickSound}
						        onClick={() => onChangeLang()}
						>
							{lang ? 'RU' : 'ENG'}
						</button>
					</div>
				</div>
				
				<div className="df">
					<div className="hint_box">
						{isHint && <div className={`hint_text ${isSettings && 'hint_absolute'}`}><span>{answers[rightAnswer]?.hint}</span></div>}
						<button className={`top__btn ${(scores >= 100 || scores <= -100 || onGetAnswer === true) ? 'disabled' : null}`}
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
					
					<button className={`top__btn ${(scores >= 100 || scores <= -100 || onGetAnswer === true) ? 'disabled' : null}`}
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
					- {lang ? 'Вкл/Выкл музыку' : 'On/Off music'}(M)
				</div>
				<div className="help_item buttons mb5">
					<button><Icon.Bell/></button>
					- {lang ? 'Вкл/Выкл звуки' : 'On/Off sound'}(M)
				</div>
				<div className="help_item buttons mb5">
					<button className="top__btn">ENG</button>
					- {lang ? 'Смена языка' : 'Change language'}(L)
				</div>
				<div className="help_item buttons mb5">
					<button><Icon.AlertCircle/></button>
					- {lang ? 'Подсказка' : 'Hint'}
				</div>
				<div className="help_item buttons mb5">
					<button><Icon.RefreshCcw/></button>
					- {lang ? 'Начать заново' : 'Restart game'}(R)
				</div>
				<div className="help_item buttons mb5">
					<button><Icon.ChevronsRight/></button>
					- {lang ? 'Пропустить раунд' : 'Skip round'}(N)
				</div>
				<div className="help_item buttons mb5">
					<button><Icon.List/></button>
					- {lang ? 'Статистика' : 'Statistics'}(S)
				</div>
				<div className="help_item buttons mb5">
					<button><Maximize/></button>
					- {lang ? 'Вкл/Выкл полный экран' : 'On/Off fullscreen'}
				</div>
			</div>}
			
			<span className="scores">{scores}/100</span>
			
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
					        className={`buttons__answer ${(scores >= 100 || scores <= -100 || onGetAnswer) ? 'disabled' : ''}
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
				{isStatsOpened && <Statistics rows={statistics} lang={lang}/>}
			</div>
			
			<div className="fullscreen_btn_box buttons">
				<button onClick={() => toggleFullscreen()}>
					<Maximize/>
				</button>
			</div>
		</div>
		
		{(isGameOver && scores >= 100)
		 ? <div className="game_result game_result__win">{lang ? 'Победа' : 'You Win'}</div>
		 : (isGameOver && scores <= -100 ? <div className="game_result game_result__lost">{!lang ? 'Поражение' : 'You lost'}</div> : null)
		}
	</div>;
};

export default Game;
