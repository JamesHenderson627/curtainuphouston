var React = require('react')

var HomeView = React.createClass({
	// componentDidMount: function() {
	// 	console.log(this)
	// }, 

	render: function() {
		return (
			<div>
				<Header about={this.props.showAboutView} logInUser={this.props.logInUser} currentUser={this.props.currentUser} />
				<Skyline aboutDisplay={this.props.aboutDisplay}/>
				<Body getGeoLocation={this.props.getGeoLocation}/>
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
					<h3>Curtain Up Houston!</h3>
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
	// 	console.log("=====navbar component======")
	// 	console.log(this)
	},

	_goHome: function() {
		location.hash = "home"
	},

	_goToProfile: function() {
		location.hash = "userProfile"
	},

	_goAbout: function() {
		location.hash = "about"
	},
			
	render: function() {
		var profileButton;
		if (this.state.currentUser) {
			profileButton = <li id="profile" onClick={this._goToProfile}>Profile</li>
		} else {
			<li id="profile" style={{"display": "none"}} onClick={this._goToProfile}>Profile</li>
		}
		var loginButton;
		if (!this.state.currentUser) {
			loginButton = <LogInButton logInUser={this.props.logInUser}/>
		} else {
			loginButton = <LogOutButton />
		}
		return(
			<div id="navContainer">
				<ul id="navbar">
					<li id="home" onClick={this._goHome}>Home</li>
					<li id="aboutUs" onClick={this._goAbout}>About</li>
					{profileButton}
					{loginButton}
				</ul>
			</div>
			)
	}
})

var LogInButton = React.createClass({
	_getUserData: function() {
		var username = this.refs.username.value,
			password = this.refs.password.value
			this.props.logInUser(username, password)
	},

	_signUp: function() {
		location.hash = "signup"
	},

	render: function() {
		return(
			<div className="login">
				<input type="checkbox" id="login"></input>
				<label htmlFor="login">Login</label>
				<ul id="loginBox">
					<li>
						<input type="text" placeholder="Login" ref="username"></input>
					</li>
					<li>
						<input type="password" placeholder="Password" ref="password"></input>
					</li>
					<li>
						<button type="button" id="signIn" onClick={this._getUserData}>Log In</button>
					</li>
					<p id="question">Want to be involved?</p>
					<li>
						<button type="button" id="signUp" onClick={this._signUp}>Sign Up</button>
					</li>
				</ul>
			</div>
			)
	}
})

var LogOutButton = React.createClass({
	_logUserOut: function() {
		console.log(location.hash)
		console.log("====logging out=====")
		location.hash = "logout"
		console.log(location.hash)
	},

	render: function() {
		return(
			<li id="logout" onClick={this._logUserOut}>Log Out</li>
			)
	}
})

var Skyline = React.createClass({

	render: function() {
		return(
			<div id="infoContainer">
				<img id="skyline" src="./images/houston_skyline.jpg"/>
				<About aboutDisplay={this.props.aboutDisplay}/>
			</div>
			)
	}
})

var About = React.createClass({

	render: function() {
		// console.log(this.props)
		return(
			<div style={{display: this.props.aboutDisplay}} id="aboutInfo">
					<p>Welcome to Curtaion Up Houston! We believe that the community theatres of Houston should be easily accessible to the members of its community. Simply enter your location below and see how close you are to great theatre! If you are a company or playhouse we would love for you to conribute to this outreach by creating an account and adding your information to our growing database. Thanks for stopping by and enjoy the show!
					</p>
			</div>
			)
	}
})

var Body = React.createClass({
	// getInitialState: function(){
	// 	return {spinner:false}
	// },

	_getTheatreCollection: function(event) {
		if (event.keyCode === 13) {
			// console.log(event)
			location.hash = "theatres/" + event.target.value
		}
	},

	getCurrentLocation: function(event) {
		console.log("clicked!")
		console.log(document.querySelector('body'))
		event.target.style.cursor = "wait"
		document.querySelector('body').style.cursor = "wait"
		// location.hash = "theatres/" + 
		this.props.getGeoLocation()
	},

	render: function() {
		return (
			<div id="geoSearch">
				<h5>Locate Theatres</h5>
				<input type="text" id="zip" onKeyDown={this._getTheatreCollection} placeholder="Zip Code"></input>
				<p>Or</p>
				<button type="button" id="geoLocate" onClick={this.getCurrentLocation}>Use Current Location</button>
			</div>
			)
	}
})

export default HomeView
export {Header}
export {Skyline}

