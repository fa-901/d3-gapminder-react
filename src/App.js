import React, { useEffect } from "react";
import * as d3 from 'd3';
import "./styles.css";
import data from './data/data.json'

export default function App() {

	const margin = { left: 70, right: 20, top: 10, bottom: 35 };
	const width = 600 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	useEffect(()=>{
		startChart();
	}, []);

	function startChart() {
		console.log(data);

		var g = d3.select("#chart-area")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);
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
