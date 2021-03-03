import React from 'react';
import './styles.scss';

const Statistics = ({ rows }) => {
	return <div className="statistics_table_box">
		<table>
			<thead>
			<tr>
				<th>Right</th>
				<th>Wrong</th>
				<th>Skipped</th>
				<th>Status</th>
			</tr>
			</thead>
			
			<tbody>
			{rows.map((row, index) => <tr key={index}>
				<td className="success">{row.rightCount}</td>
				<td className="error">{row.wrongCount}</td>
				<td className="error">{row.skipped}</td>
				<td className={`${row.status ? 'success' : 'error'}`}>{row.status ? 'Win' : 'Lost'}</td>
			</tr>
			)}
			</tbody>
		</table>
	</div>;
};

export default Statistics;
