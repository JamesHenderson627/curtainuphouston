var React = require('react')

import {Header} from "./homeView.js"

var ProfileView = React.createClass({
	_handleLogOut: function() {
		location.hash = "logout"
	},

	render: function() {
		return(
			<div>
				<Header currentUser={this.props.currentUser}/>
				<MainContainer />
			</div>
			)
	}
})

var MainContainer = React.createClass({
	render: function() {
		return(
			<div id="mainContainer">
				<PicAndInfo />
				<DatesandShows />
			</div>
			)
	}
})

var PicAndInfo = React.createClass({
	render: function() {
		return(
			<div id="infoHead">
				<Logo />
				<ProfileIntro />
			</div>
			)
	}
})

var Logo = React.createClass({
	render: function() {
		return(
			<div id="theatreLogo">
				<h2>LOGO</h2>
			</div>
			)
	}
})

var ProfileIntro = React.createClass({
	render: function() {
		return(
			<div id="basicTheatreInfo">
				<h3>This is my Place!</h3>
				<p>This is my website!</p>
				<p>This is the snippet abount my place and why it's soooooo awesome!</p>
			</div>
			)
	}
})

var DatesandShows = React.createClass({
	render: function() {
		return(
			<div id="dateAndShows">
				<Calender />
				<ShowGrid />
			</div>
			)
	}
}) 
var Calender = React.createClass({
	render: function() {
		return(
			<div id="calender">
				<p>I have a calender!</p>
			</div>
			)
	}
})

var ShowGrid = React.createClass({
	render: function() {
		return(
			<div id="showGrid">
				<p>I has shows!</p>
			</div>
			)
	}
})




export default ProfileView