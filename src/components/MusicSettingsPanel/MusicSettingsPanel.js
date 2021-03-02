import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import "../styles.scss";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

const MusicSettingsPanel = ({ musicRef }) => {
	const [state, setState] = useState({
		toggled: false,
		volume: [100],
	});
	
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
						<div className="range_track" ref={props.ref} style={{
							background: getTrackBackground({
								values: state.volume,
								colors: ["#548BF4", "#ccc"],
								min: MIN,
								max: MAX,
							})
						}}
						>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ props, isDragged }) => (
					<div className="range_thumb_box" {...props}>
						<div className="range_thumb" style={{ backgroundColor: isDragged ? "#548BF4" : "#CCC", }}/>
					</div>
				)}
			/>
		</div>
	);
};

export default MusicSettingsPanel;
