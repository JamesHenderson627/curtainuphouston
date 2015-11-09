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
var Profile = new Parse.Object.extend("Profile")

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

//===================BACKBONE ROUTER==================
var TheatreRouter = Backbone.Router.extend({

	routes: {
		"logout": "logUserOut",
		"profile/home": "showProfile",
		"about": "showAboutView",
		"signup": "showSignUp",
		"theatres/:location": "showTheatreList",
		"*home": "showHomeView"
	},

	_createNewUser: function(username, password, company, address, city, state, zip, phone, web, snippet){
		console.log(username)
		var newUsr = new Parse.User()
		newUsr.set({
			'username': username,
			'password': password,
			'company': company,
			'address': address,
			'city': city,
			'state': state,
			'zip': zip,
			'phone': phone,
			'web': web,
			'snippet': snippet
		})
		newUsr.signUp(null, {
			success: function(){
				location.hash = "profile/home"
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
				location.hash = "profile/home"
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

	showAboutView: function() {
		ReactDOM.render(<HomeView aboutDisplay="block" currentUser={this._user()} logInUser={this._logInUser} />,document.querySelector('#container'))
	},

	showHomeView: function() {
		console.log('routing home')
		ReactDOM.render(<HomeView aboutDisplay="none" currentUser={this._user()} logInUser={this._logInUser} />,document.querySelector('#container'))
	},

	showProfile: function() {
		console.log("Fetching the profile")
		ReactDOM.render(<ProfileView currentUser={this._user()}/>,document.querySelector('#container'))
	},

	showSignUp: function() {
		ReactDOM.render(<SignUpScreen sendUserData={this._createNewUser} />,document.querySelector('#container'))
	},

	showTheatreList: function(inputLocation) {
		console.log("Going in for the fetch")
		var Users = Parse.Object.extend("User"),
			theatreQuery = new Parse.Query(Users) 
		$.when(
			this.tlc.fetch ({
				url: this.tlc.url + "?location=" + inputLocation
			}),
			theatreQuery.find({
				success: function(results) {
					console.log("got " + results.length + " theatres!")
				}
			})
		)
		ReactDOM.render(<ListView theatreListInfo={this.tlc} />,document.querySelector('#container'))
	},

	initialize: function() {
		this.tlc = new TheatreListCollection()
		console.log("starting things")
		Backbone.history.start()
	}

})

var tr = new TheatreRouter()




