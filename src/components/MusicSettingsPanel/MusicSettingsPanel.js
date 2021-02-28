import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { useHotkeys } from "react-hotkeys-hook";
import "../styles.scss";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

const Volume = ({ musicRef }) => {
	const [state, setState] = useState({
		toggled: false,
		volume: [0],
	});
	
	useHotkeys("m", () => setState({ ...state, volume: [0] }));
	
	useEffect(() => {
		const e = state.volume[0];
		musicRef.current.volume = e * 0.01;
		document.addEventListener("click", () => musicRef.current?.play());
	}, [state.volume, musicRef]);
	
	return (
		<div className="volume">
			<Range
				values={state.volume}
				step={STEP}
				min={MIN}
				max={MAX}
				onChange={(values) => setState({ ...state, volume: values })}
				renderTrack={({ props, children }) => (
					<div onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} className="music_range_box">
						<div ref={props.ref} style={{
							height: "5px",
							width: "100%",
							borderRadius: "4px",
							background: getTrackBackground({
								values: state.volume,
								colors: ["#548BF4", "#ccc"],
								min: MIN,
								max: MAX,
							}),
							alignSelf: "center",
						}}
						>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ props, isDragged }) => (
					<div
						{...props}
						style={{
							height: "15px",
							width: "15px",
							borderRadius: "50%",
							backgroundColor: "#FFF",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							boxShadow: "0px 2px 6px #AAA",
						}}
					>
						<div
							style={{
								height: "5px",
								width: "5px",
								borderRadius: "50%",
								backgroundColor: isDragged ? "#548BF4" : "#CCC",
							}}
						/>
					</div>
				)}
			/>
		</div>
	);
};

const MusicSettingsPanel = ({ musicRef }) => {
	return (
		<div>
			<Volume musicRef={musicRef}/>
		</div>
	);
};

export default MusicSettingsPanel;
