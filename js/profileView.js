var React = require('react')

import {Header} from "./homeView.js"
import {Background} from "./signUp.js"

var ProfileView = React.createClass({
	componentDidMount: function() {
		console.log(this)
	},

	_handleLogOut: function() {
		location.hash = "logout"
	},

	render: function() {
		return(
			<div>
				<Header currentUser={this.props.currentUser}/>
				<Background />
				<MainContainer currentUser={this.props.currentUser}/>
			</div>
			)
	}
})

var MainContainer = React.createClass({
	render: function() {
		return(
			<div id="mainContainer">
				<PicAndInfo currentUser={this.props.currentUser}/>
				<DatesandShows />
			</div>
			)
	}
})

var PicAndInfo = React.createClass({
	render: function() {
		return(
			<div id="infoHead">
				<Logo currentUser={this.props.currentUser}/>
				<ProfileIntro currentUser={this.props.currentUser}/>
			</div>
			)
	}
})

var Logo = React.createClass({
	render: function() {
		var link = this.props.currentUser.get("web")
		return(
			<div>
				<div id="theatreLogo">
					<img src="http://d18mx3glitq1vd.cloudfront.net/wp-content/uploads/2013/08/your-logo-here.png"/>
				</div>
				<a id="theatreLink" href={link}>{link}</a>
			</div>
			)
	}
})

var ProfileIntro = React.createClass({
	componentDidMount: function() {
		console.log("========ProfileIntro=======")
		console.log(this)
	},

	render: function() {
		var name = this.props.currentUser.get("company"),
			snippet = this.props.currentUser.get("snippet"),
			address = this.props.currentUser.get("address"),
			city = this.props.currentUser.get("city"),
			state = this.props.currentUser.get("state"),
			zip = this.props.currentUser.get("zip"),
			phone = this.props.currentUser.get("phone")
		return(
			<div id="basicTheatreInfo">
				<h3 id="name">{name}</h3>
				<p id="aboutMe">{snippet}</p>
				<p id="address">{address}<br/>{city}, {state} {zip}</p>
				<p id="phone">{phone}</p>
			</div>
			)
	}
})

var DatesandShows = React.createClass({
	render: function() {
		return(
			<div id="dateAndShows">
				
			</div>
			)
	}
}) 
// var Calender = React.createClass({
// 	render: function() {
// 		return(
// 			<div id="calender">
// 				<p>I have a calender!</p>
// 			</div>
// 			)
// 	}
// })

// var ShowGrid = React.createClass({
// 	render: function() {
// 		return(
// 			<div id="showGrid">
// 				<p>I has shows!</p>
// 			</div>
// 			)
// 	}
// })




export default ProfileView