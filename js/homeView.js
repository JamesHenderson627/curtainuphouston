var React = require('react')

var HomeView = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<img id="skyline" src="./images/houston_skyline.jpg" />
				<Body />
			</div>
			)
	}
})

var Header = React.createClass({
	render: function() {
		return(
			<div id="header">
				<img id="logo" src='./images/masks.jpg' />
				<div id="greeting">
					<h3>Theatre Search</h3>
					<p>Connecting Houston to it's community theatres since just now.</p>
				</div>
				<NavBar />
			</div>
			)
	}
})

var NavBar = React.createClass({
	render: function() {
		return(
			<ul id="navbar">
				<li>Home</li>
				<li>About</li>
				<li>Log In</li>
			</ul>
			)
	}
})

var Body = React.createClass({
	_getTheatreCollection: function(event) {
		if (event.keyCode === 13) {
			location.hash = "theatres/" + event.target.value
		}
	},

	render: function() {
		return (
			<div id="geoSearch">
				<h5>Shall we begin?</h5>
				<input type="text" onKeyDown={this._getTheatreCollection} placeholder="Zip(pety Doo Dah) Code"></input>
			</div>
			)
	}
})

export default HomeView
export {Header}