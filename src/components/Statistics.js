import React from 'react';
import './styles.scss';

const Statistics = ({ rows, lang }) => {
	const rus = ['Правильно', 'Неправильно', 'Пропущено', 'Результат'];
	const eng = ['Right', 'Wrong', 'Skipped', 'Result'];
	const headItems = lang ? rus : eng;

	return <div className="statistics_table_box">
		<table>
			<thead>
			<tr>
				{headItems.map((item, index) => <th key={index}>{item}</th>)}
			</tr>
			</thead>
			
			<tbody>
			{rows.map((row, index) => <tr key={index}>
				<td className="success">{row.rightCount}</td>
				<td className="error">{row.wrongCount}</td>
				<td className="error">{row.skipped}</td>
				<td className={`${row.status ? 'success' : 'error'}`}>
					{row.status ? (lang ? 'Победа' : 'Win') : (!lang ? 'Lost' : 'Поражение')}
				</td>
			</tr>
			)}
			</tbody>
		</table>
	</div>;
};

export default Statistics;
