import React, { useEffect } from "react";
import "./styles.css";
import data from './data/data.json'

export default function App() {

	useEffect(()=>{
		startChart();
	}, []);

	function startChart() {
		console.log(data)
	}


	return (
		<div className="App">
			<nav className="navbar navbar-default">
				<div className="container">
					<a className="navbar-brand" href="#"><img id="logo" src="img/logo.png" /></a>
				</div>
			</nav>

			<div className="container">
				<div className="row">
					<div id="chart-area"></div>
				</div>
			</div>
		</div>
	);
}
