import React, { useEffect } from "react";
import * as d3 from 'd3';
import "./styles.css";
import json from './data/data.json'

export default function App() {

	const margin = { left: 70, right: 20, top: 10, bottom: 35 };
	const width = 600 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	useEffect(() => {
		startChart();
	}, []);

	function startChart() {
		let data = json[0].countries;
		console.log(data);

		var g = d3.select("#chart-area")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		var x = d3.scaleLog()
			// .domain([300, d3.max(data, (d) => { return d.income })])
			.domain([300, 150000])
			.range([0, width]);

		var xAxis = g.append("g")
			.attr("class", "x axis")
			.attr('transform', `translate(0, ${height})`);

		var y = d3.scaleLinear()
			.domain([0, d3.max(data, (d) => { return d.life_exp })])
			.range([height, 0]);

		var yAxis = g.append("g")
			.attr("class", "y axis")
			.attr('transform', `translate(0, 0)`);

		var xAxisCall = d3.axisBottom(x)
			.tickValues([400, 4000, 40000]);
		var yAxisCall = d3.axisLeft(y);

		xAxis.call(xAxisCall)
		yAxis.call(yAxisCall)
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
