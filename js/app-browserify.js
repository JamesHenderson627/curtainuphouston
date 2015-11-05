// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

var $ = require('jquery'),
	Backbone = require('backbone'),
	React = require('react'),
	ReactDOM = require('react-dom'),
	Parse = require('parse')

console.log("Javascript loaded!!")

// import {React, Component, DOM} from 'react-resolver'

// other stuff that we don't really use in our own code
// var Pace = require("../bower_components/pace/pace.js")

// require your own libraries, too!
// var Router = require('./app.js')

// window.addEventListener('load', app)

// function app() {
    // start app
    // new Router()
// }
import HomeView from "./homeView.js"
import ProfileView from "./profileView.js"
import SignUpScreen from "./signUp.js"
import ListView from "./listView.js"

window.p = Parse

//=========PARSE STUFF==============
var APP_ID = 'eC3CnUDDFYQ9uCAlCHMTgURJ33XBlgbvW6rNMZxe',
	JS_KEY = 'VER7FQQD999sbnoXL3tVsmpxlJspWYlPWrUBt88T',
	REST_KEY = 'AWZOcYmy2jCYal4pGcUG7vZGaIxyWmFBvKGPkPsU'

Parse.initialize(APP_ID, JS_KEY, REST_KEY)

//===============BACKBONE COLLECTION=============
var TheatreListCollection = Backbone.Collection.extend({
	url: "/myYelp",

	parse: function(responseData) {
		console.log("---parse object---")
		console.log(responseData)
		this.region = responseData.region
		return responseData.businesses
	}
})

var VenueCollection = Backbone.Collection.extend({
	url: "https://api.parse.com/1/classes/venues",

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_KEY
	},

	model: VenueModel,

	parse: function() {
		console.log(responseData)
		return responseData
	}
})

//=====================MODELS====================
var VenueModel = Backbone.Model.extend({
	url: "https://api.parse.com/1/classes/venues",

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_KEY
	}
})
//===================BACKBONE ROUTER==================
var TheatreRouter = Backbone.Router.extend({

	routes: {
		"logout": "logUserOut",
		"profile": "showProfile",
		"signup": "showSignUp",
		"theatres/:location": "showTheatreList",
		"*home": "showHomeView"
	},

	_createNewUser: function(username, password){
		console.log(username)
		var newUsr = new Parse.User()

		newUsr.set('username', username)
		newUsr.set('password', password)
		newUsr.signUp(null, {
			success: function(user){
				location.hash = 'profile'
				alert("Hooray! Welcome to the community!")
			},
			fail: function(err){
				alert("Something went horribly wrong! Give it another go.")
			}
		})
	},

	_user: function(){
		return Parse.User.current()
	},

	_logInUser: function(username, password) {
		Parse.User.logIn(username, password, {
			success: function() {
				location.hash = "profile"
			},
			fail: function() {
				alert("Incorrect username and/or password. Please try again.")
			}
		})
	},

	logUserOut: function(){

		Parse.User.logOut().then(function(){
			location.hash = "home"
		})
	},

	showHomeView: function() {
		ReactDOM.render(<HomeView currentUser={this._user()} logInUser={this._logInUser} />,document.querySelector('#container'))

	},

	showProfile: function() {
		ReactDOM.render(<ProfileView currentUser={this._user()} />,document.querySelector('#container'))
	},

	showSignUp: function() {
		ReactDOM.render(<SignUpScreen sendUserData={this._createNewUser} />,document.querySelector('#container'))
	},

	showTheatreList: function(inputLocation) {
		console.log("Going in for the fetch")
		this.tlc.fetch ({
			url: this.tlc.url + "?location=" + inputLocation
		})
		ReactDOM.render(<ListView theatreListInfo={this.tlc} />,document.querySelector('#container'))
	},

	initialize: function() {
		this.tlc = new TheatreListCollection()
		this.vc = new VenueCollection()
		console.log("starting things")
		Backbone.history.start()
	}

})

var tr = new TheatreRouter()




