import React from 'react';
import './styles.scss';

const Statistics = ({ rows }) => {

	return <div className="statistics_table_box">
		<table>
			<thead>
			<tr>
				<th>Name</th>
				<th>Right</th>
				<th>Wrong</th>
				<th>Skipped</th>
				<th>Status</th>
			</tr>
			</thead>
			
			<tbody>
			{rows.map((row, index) => <tr key={index}>
				<td>{row.name}</td>
				<td className="success">{row.rightCount}</td>
				<td className="error">{row.wrongCount}</td>
				<td className="error">{row.skipped}</td>
				<td className={`${row.status === 'Win' ? 'success' : 'error'}`}>{row.status}</td>
			</tr>
			)}
			</tbody>
		</table>
	</div>;
};

export default Statistics;
