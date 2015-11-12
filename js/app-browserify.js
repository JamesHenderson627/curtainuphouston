// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

var $ = require('jquery'),
	Backbone = require('backbone'),
	React = require('react'),
	ReactDOM = require('react-dom'),
	Parse = require('parse'),
	swal = require('sweetalert')

console.log("Javascript loaded!!!!")

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
import UserProfileView from "./userProfileView.js"
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

//=================GEOCODE API===========
var geocodeApi = "AIzaSyD9wF8QYzM1ShAP2JiGUz11xHujhsSfjrA"

//==================GEOLOCATION API==============
var geolocationKey = "AIzaSyAw1n_6rFDHoDwd5pCi20JgeuIq-a9c3x0"

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
		"profile/:source/:name": "showProfile",
		"userProfile": "showUserProfile",
		"about": "showAboutView",
		"signup": "showSignUp",
		"theatres/:location": "showTheatreList",
		"*home": "showHomeView"
	},

	collectionFetch: function(inputLocation) {
		return this.tlc.fetch ({
			url: this.tlc.url + "?location=" + inputLocation
		})
	},

	modelFetch: function(id) {
		return this.tlc.fetch ({
			url: this.tlc.url + "?id=" + id
		})
	},

	combineData: function(yelpData, parseData) {
	 	console.log(yelpData)
		console.log(parseData)
		// window.arguments = arguments
		this.combinedArray=[]
		var self = this
		this.model = Backbone.Model.extend({
			defaults: {
				name: "",
				address: "",
				city: "",
				state: "",
				zip: "",
				latlng: "",
				id: "",
				source: ""
			}
		})

		if(parseData)
			parseData.forEach(function(data) {
				var myParseResults = {
					name: data.get("company"),
					address: data.get("address"),
					city: data.get("city"),
					state: data.get("state"),
					zip: data.get("zip"),
					latlng: data.get("latlng"),
					id: data.id,
					web: data.get("web"),
					snippet: data.get("snippet"),
					phone: data.get("phone"),
					source: function(){return "p"}
				}
				self.combinedArray.push(new self.model(myParseResults))
			})
		if(yelpData)
			yelpData.forEach(function(business) {
				var location = business.location.coordinate,
					myYelpResults = {
					name: business.name,
					address: business.location.address[0],
					city: business.location.city,
					state: business.location.state_code,
					zip: business.location.postal_code,
					latlng: {lat: location.latitude, lng: location.longitude},
					id: business.id,
					web: business.url,
					snippet: business.snippet_text,
					phone: business.display_phone,
					source: function(){return "y"}
				}
				self.combinedArray.push(new self.model(myYelpResults))
			})

		console.log("=====combinedArray=====")
		console.log(this.combinedArray)

		return this.combinedArray
	},

	_createNewUser: function(username, password, company, email, address, city, state, zip, phone, web, snippet){
		var self = this
		self.doGeocodeAjax(address, city, state, zip).done(function(responseData){
			var loc = responseData.results[0].geometry.location,
				 newUsr = new Parse.User()
			newUsr.set({
				'username': username,
				'password': password,
				'company': company,
				'email': email,
				'address': address,
				'city': city,
				'state': state,
				'zip': zip,
				'phone': phone,
				'web': web,
				'snippet': snippet,
				'latlng': {lat:loc.lat,lng:loc.lng}
			})
			console.log(newUsr)
			newUsr.signUp(null, {
				success: function(){
					swal({
						title: "Hooray!", 
						text: "Welcome to the community!", 
						type: "success"
					})
					location.hash = "userProfile"
				},
				fail: function(err){
					alert("Something went horribly wrong! Give it another go.")
				}
			})
		})
	},

	doGeocodeAjax: function(address, city, state, zip) {
		var newAddress = address + " " + " " + city + " " +  state + " " + zip,
			ajaxParams = {
			url: "https://maps.googleapis.com/maps/api/geocode/json",
			data: {
				address: newAddress,
				key: geocodeApi
			}
		}

		return $.ajax(ajaxParams)
	},

	getGeoLocation: function() {
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude,
				lon = position.coords.longitude,
            	latlon = {lat:lat,lng:lon}
        	console.log(latlon)
			location.hash = "theatres/" + lat+','+lon
        	// return latlon
		})	
	},

	getCenter: function(yelpData) {
		var centerLoc = yelpData[0].region.center,
			centerLoc = {lat: centerLoc.latitude, lng: centerLoc.longitude} 
		return centerLoc
	},

	_logInUser: function(username, password) {
		Parse.User.logIn(username, password, {
			success: function() {
				location.hash = "userProfile"
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

	parseFetch: function(userId) {
		var Users = Parse.Object.extend("User"),
			theatreQuery = new Parse.Query(Users)
		if (userId){
			theatreQuery.equalTo("objectId", userId)
			return theatreQuery.find({
				success: function(result) {
					console.log("got the thing with the stuff")
					console.log(result)
				}
			})
		}
		return theatreQuery.find({
			success: function(results) {
			console.log("got " + results.length + " theatres!")
			}
		})
	},

	_user: function(){
		return Parse.User.current()
	},

	showAboutView: function() {
		ReactDOM.render(<HomeView aboutDisplay="block" currentUser={this._user()} logInUser={this._logInUser} getGeoLocation={this.getGeoLocation} />,document.querySelector('#container'))
	},

	showHomeView: function() {
		console.log('routing home')
		ReactDOM.render(<HomeView aboutDisplay="none" currentUser={this._user()} logInUser={this._logInUser} getGeoLocation={this.getGeoLocation}/>,document.querySelector('#container'))
	},

	showProfile: function(source, id) {
		console.log("Getting the profile")
		var self = this
		var deferred
		if (source === "p") {
			deferred = this.parseFetch(id)

			deferred.then(function(parseData){
				var newData = self.combineData(null, parseData)
				ReactDOM.render(<ProfileView profileInfo={newData[0]} currentUser={self._user()}/>,document.querySelector('#container'))
				})
		}
		if (source === "y") {
			deferred = this.modelFetch(id)
			
			deferred.then(function(yelpData){
				console.log(yelpData)
				var newData = self.combineData(yelpData.businesses)
				ReactDOM.render(<ProfileView profileInfo={newData[0]} currentUser={self._user()}/>,document.querySelector('#container'))
				})
		}
	},

	showUserProfile: function() {
		console.log("Fetching the profile")
		ReactDOM.render(<UserProfileView currentUser={this._user()}/>,document.querySelector('#container'))
	},

	showSignUp: function() {
		ReactDOM.render(<SignUpScreen sendUserData={this._createNewUser.bind(this)} logInUser={this._logInUser}/>,document.querySelector('#container'))
	},

	showTheatreList: function(inputLocation) {
		console.log("Going in for the fetch")
		var self = this
		$.when(
			this.collectionFetch(inputLocation),
			this.parseFetch()
		).then(function(yelpData, parseData){
			console.log(yelpData)
			console.log(parseData)
			var newData = self.combineData(yelpData[0].businesses, parseData._result[0]),
				centerLoc = self.getCenter(yelpData)
				ReactDOM.render(<ListView center={centerLoc} theatreListInfo={newData} logInUser={self._logInUser}  />,document.querySelector('#container'))
		})
	},

	initialize: function() {
		this.tlc = new TheatreListCollection()
		this.combinedArray = []
		console.log("starting things")
		Backbone.history.start()
	}

})

var tr = new TheatreRouter()




