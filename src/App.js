import React, { useEffect } from "react";
import * as d3 from 'd3';
import "./styles.css";
import json from './data/data.json'

export default function App() {

	const margin = { left: 50, right: 20, top: 10, bottom: 40 };
	const width = 600 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;
	const timer = 800;

	useEffect(() => {
		startChart();
	});

	function area(r) {
		return (Math.pow(r, 2) * Math.PI)
	}

	function startChart() {
		var index = 0;
		// let data = json[0].countries;
		// data = data.filter((v) => {
		// 	return (!v.income || !v.life_exp) ? false : true
		// });
		// console.log(data);

		var g = d3.select("#chart-area")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		var x = d3.scaleLog()
			.domain([100, 200000])
			.range([0, width]);

		var xAxis = g.append("g")
			.attr("class", "x axis")
			.attr('transform', `translate(0, ${height})`);

		var y = d3.scaleLinear()
			.domain([0, 90])
			.range([height, 0]);

		var yAxis = g.append("g")
			.attr("class", "y axis")
			.attr('transform', `translate(0, 0)`);

		var xAxisCall = d3.axisBottom(x)
			.tickValues([400, 4000, 40000])
			.tickFormat((d) => { return `$${d}` })

		var yAxisCall = d3.axisLeft(y);

		xAxis.call(xAxisCall)
		yAxis.call(yAxisCall)

		var xLabel = g.append('text')
			.text('GDP Per Capita')
			.attr('x', width / 2)
			.attr('y', (height + margin.bottom - 5))
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

		var yearLabel = g.append('text')
			.attr('x', width)
			.attr('y', (height - 3))
			.attr('class', 'year-label');

		var t = d3.transition().duration(timer / 3);

		var update = () => {
			let data = json[index].countries;
			data = data.filter((v) => {
				return (!v.income || !v.life_exp) ? false : true
			});

			var r = d3.scaleLinear()
				.domain([d3.min(data, (d) => { return d.population }), d3.max(data, (d) => { return d.population })])
				.range([area(5), area(25)]);

			yearLabel.text(`${json[index].year}`);

			let radius = 5;

			var points = g.selectAll("circle")
				.data(data, (d) => { return d.country });

			points.exit()
				// .transition(t)
				.attr('cy', y(0))
				.remove();

			points.enter()
				.append("circle")
				.attr("cy", function (d) { return y(0) })
				.attr("cx", function (d) { return x(d.income) })
				.attr('r', function (d) { return Math.sqrt(r(d.population) / Math.PI) })
				.merge(points)
				.transition(t)
				.attr("class", (d) => { return `point fill-${d.continent}` })
				.attr("cy", function (d) { return y(d.life_exp) })
				.attr("cx", function (d) { return x(d.income) });
		}

		setInterval(() => {
			(index === (json.length - 1)) ? index = 0 : index++;
			update();
		}, timer);
		update();
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
