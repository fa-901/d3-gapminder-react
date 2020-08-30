import React, { useEffect } from "react";
import * as d3 from 'd3';
import "./styles.css";
import json from './data/data.json'

export default function App() {

	const margin = { left: 50, right: 20, top: 10, bottom: 40 };
	const width = 600 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	useEffect(() => {
		startChart();
	}, []);

	function startChart() {
		let data = json[0].countries;
		// data = data.map((v)=>{
		// 	return {
		// 		...v,
		// 		income: isNaN(parseFloat(v.income)) ? 0 : v.income,
		// 		life_exp: isNaN(parseFloat(v.life_exp)) ? 0 : v.life_exp,
		// 		population: isNaN(parseFloat(v.population)) ? 0 : v.population,
		// 	}
		// });
		data = data.filter((v) => {
			return (!v.income || !v.life_exp) ? false : true
		});
		
		// console.log(data);

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
			.tickValues([400, 4000, 40000])
			.tickFormat((d)=>{ return `$${d}`})

		var yAxisCall = d3.axisLeft(y);

		xAxis.call(xAxisCall)
		yAxis.call(yAxisCall)

		var xLabel = g.append('text')
			.text('GDP Per Capita')
			.attr('x', width / 2)
			.attr('y', (height + margin.bottom -5))
			.attr('text-anchor', 'middle')
			.attr('font-size', '18px')
			.attr('text-anchor', 'middle')

		var yLabel = g.append('text')
			.attr('x', -(height / 2))
			.attr('y', -(margin.left - margin.right))
			.attr('text-anchor', 'middle')
			.attr('font-size', '18px')
			.attr('text-anchor', 'middle')
			.attr('transform', 'rotate(-90)')
			.text('Life Expectancy (Years)')

		// var update = () => {
		// 	var points = g.selectAll("rect")
		// 		.data(data);

		// 	points.exit().remove();

		// 	points.attr("y", function (d) { return y(d.life_exp); })
		// 		.attr("x", function (d) { console.log(d); return x(d.income) })
		// 		.attr("height", function (d) { return height - y(d.life_exp); })
		// 		.attr("width", x.bandwidth);

		// 	points.enter()
		// 		.append("rect")
		// 		.attr("y", function (d) { return y(d.life_exp); })
		// 		.attr("x", function (d) { return x(d.income) })
		// 		.attr("height", function (d) { return height - y(d.life_exp); })
		// 		.attr("width", x.bandwidth)
		// 		.attr("fill", "grey");
		// }

		// update();
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
