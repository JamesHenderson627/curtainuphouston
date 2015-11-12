var React = require('react')

import {Header} from "./homeView.js"
import {Skyline} from "./homeView.js"

var SignUpScreen = React.createClass({
	render: function(){

		return(
			<div>
				<Header logInUser={this.props.logInUser}/>
				<Background />
				<SignUp sendUserData={this.props.sendUserData} />
			</div>	
			)
	}
})

var Background = React.createClass({
	render: function() {
		return(
			<img id="backgroundImg"src="./images/houston_skyline.jpg"/>
			)
	}
})

var SignUp = React.createClass({
	_getNewUserData: function(){
		var username = this.refs.username.value,
			password = this.refs.password.value,
			company = this.refs.company.value,
			address = this.refs.address.value,
			city = this.refs.city.value,
			state = this.refs.state.value,
			zip  = this.refs.zip.value,
			phone = this.refs.phone.value,
			web = this.refs.web.value,
			snippet = this.refs.snippet.value
		if (!username) {
			swal({
				title: "Oops...!", 
				text: "Looks like you didn't put a username", 
				type: "error"
			})
			return
		}
		if (!password) {
			swal({
				title: "Oops...!", 
				text: "Look like you didn't put a password", 
				type: "error"
			})
			return
		}
		if (!company) {
			swal({
				title: "Oops...!", 
				text: "Look like you didn't put a company or venue", 
				type: "error"
			})
			return
		}
		if (!address) {
			swal({
				title: "Oops...!", 
				text: "Look like you didn't put a address", 
				type: "error"
			})
			return
		}
		if (!city) {
			swal({
				title: "Oops...!", 
				text: "Look like you didn't put a city", 
				type: "error"
			})
			return
		}
		if (!state) {
			swal({
				title: "Oops...!", 
				text: "Look like you didn't put a state", 
				type: "error"
			})
			return
		}
		if (!zip) {
			swal({
				title: "Oops...!", 
				text: "Look like you didn't put a zip", 
				type: "error"
			})
			return
		}
		if (!phone) {
			swal({
				title: "Oops...!", 
				text: "Look like you didn't put a phone number", 
				type: "error"
			})
			return
		}
		if (!web) {
			web = null
		}
		if (!snippet) {
			snippet = null
		}
		this.props.sendUserData(username, password, company, address, city, state, zip, phone, web, snippet)
	},

	render: function() {
		return(
			<div id="signUpBox">
					<h2>Join Us!</h2>
					<input type="text" placeholder="Your Username" ref="username"/>
					<input type="password" placeholder="Your Password" ref="password"/>
					<input type="text" id="name" placeholder="Company or venue"ref="company"></input>
					<input type="text" id="address" placeholder="Address"ref="address"></input>
					<input type="text" id="city" placeholder="City"ref="city"></input>
					<input type="text" id="state" placeholder="State"ref="state"></input>
					<input type="text" id="zip" placeholder="Zip Code"ref="zip"></input>
					<input type="tel" id="phone" placeholder="Phone Number" ref = "phone"></input>
					<input type="text" id="siteLink" placeholder="Website"ref="web"></input>
					<textarea type="text" id="snippet" placeholder="Something about yourself"ref="snippet"></textarea>
					<button id="signUp" onClick={this._getNewUserData}>Create User</button>
				</div>
			)
	}
})

export default SignUpScreen
export {Background}