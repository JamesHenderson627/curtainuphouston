var React = require('react')

var HomeView = React.createClass({
	// componentDidMount: function() {
	// 	console.log(this)
	// }, 

	render: function() {
		return (
			<div>
				<Header logInUser={this.props.logInUser} currentUser={this.props.currentUser} />
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
				<NavBar logInUser={this.props.logInUser} currentUser={this.props.currentUser} />
			</div>
			)
	}
})

var NavBar = React.createClass({
	getInitialState: function(){
		return {
			currentUser: this.props.currentUser
		}
	},

	componentDidMount: function() {
		console.log("=====navbar component======")
		console.log(this)
	},
			
	render: function() {
		var loginButton;
		if (!this.state.currentUser) {
			loginButton = <LogInButton logInUser={this.props.logInUser}/>
		} else {
			loginButton = <LogOutButton />
		}
		return(
			<ul id="navbar">
				<li id="home">Home</li>
				<li id="about">About</li>
				{loginButton}
			</ul>
			)
	}
})

var LogInButton = React. createClass({
	_getUserData: function() {
		var username = this.refs.username.getDOMNode().value,
			password = this.refs.password.getDOMNode().value
			this.props.logInUser(username, password)
	},

	_signUp: function() {
		location.hash = "signup"
	},

	render: function() {
		return(
			<li id="login">Log In
				<ul id="loginBox">
					<li>
						<input type="text" placeholder="Login" ref="username"></input>
					</li>
					<li>
						<input type="password" placeholder="Password" ref="password"></input>
					</li>
					<li>
						<button type="button" onClick={this._getUserData}>Log In</button>
					</li>
					<li>Want to be involved?</li>
					<li>
						<button type="button" onClick={this._signUp}>Sign Up</button>
					</li>
				</ul>
			</li>
			)
	}
})

var LogOutButton = React.createClass({
	_logUserOut: function() {
		location.hash = "logout"
	},

	render: function() {
		return(
			<li id="logout" onClick={this._logUserOut}>Log Out
			</li>
			)
	}
})

var Body = React.createClass({
	_getTheatreCollection: function(event) {
		if (event.keyCode === 13) {
			console.log(event)
			location.hash = "theatres/" + event.target.value
		}
	},

	render: function() {
		return (
			<div id="geoSearch">
				<h5>Shall we begin?</h5>
				<input type="text" id="zip" onKeyDown={this._getTheatreCollection} placeholder="Zip Code"></input>
			</div>
			)
	}
})

export default HomeView
export {Header}