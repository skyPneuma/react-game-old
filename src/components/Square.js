import React from 'react';
import styles from './styles.scss';

const Square = ({ onClick, value}) => {
	return <button onClick={onClick} className="square">{value}</button>;
};

export default Square;
