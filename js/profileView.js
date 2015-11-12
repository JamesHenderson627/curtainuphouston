var React = require('react')

import {Header} from "./homeView.js"
import {Background} from "./signUp.js"

var ProfileView = React.createClass({
	componentDidMount: function() {
		console.log(this)
	},

	render: function() {
		return(
			<div>
				<Header currentUser={this.props.currentUser}/>
				<Background />
				<MainContainer profileInfo={this.props.profileInfo}/>
			</div>
			)
	}
})

var MainContainer = React.createClass({
	render: function() {
		return(
			<div id="mainContainer">
				<PicAndInfo profileInfo={this.props.profileInfo}/>
				<DatesandShows />
			</div>
			)
	}
})

var PicAndInfo = React.createClass({
	render: function() {
		return(
			<div id="infoHead">
				<Logo profileInfo={this.props.profileInfo}/>
				<ProfileIntro profileInfo={this.props.profileInfo}/>
			</div>
			)
	}
})

var Logo = React.createClass({
	render: function() {
		var link = this.props.profileInfo.get("web"),
			linkDisplay = link.slice(11)
		return(
			<div>
				<div id="theatreLogo">
					<img src="http://d18mx3glitq1vd.cloudfront.net/wp-content/uploads/2013/08/your-logo-here.png"/>
				</div>
				<a id="theatreLink" href={link}>{linkDisplay}</a>
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
		var name = this.props.profileInfo.get("name"),
			// snippet = this.props.profileInfo.get("snippet"),
			// <p id="aboutMe">{snippet}</p>
			address = this.props.profileInfo.get("address"),
			city = this.props.profileInfo.get("city"),
			state = this.props.profileInfo.get("state"),
			zip = this.props.profileInfo.get("zip"),
			phone = this.props.profileInfo.get("phone")
			console.log(name)
		return(
			<div id="basicTheatreInfo">
				<h3 id="name">{name}</h3>
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