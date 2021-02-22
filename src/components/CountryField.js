import React from 'react';

const CountryField = ({ country }) => {
	return <div className="country_field">
		<img className="country_img" src={process.env.PUBLIC_URL + `./img/countries/${country.value}.png`} alt="" />
	</div>;
};

export default CountryField;
