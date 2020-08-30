import React from "react";
import "./styles.css";

export default function App() {
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
