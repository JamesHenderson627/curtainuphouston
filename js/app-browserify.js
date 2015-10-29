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
import ListView from "./listView.js"


//===============BACKBONE COLLECTION=============
var TheatreCollection = Backbone.Collection.extend({
	url: "/myYelp",

	parse: function(responseData) {
		return responseData.businesses
	}
})

//===================BACKBONE ROUTER===================
var TheatreRouter = Backbone.Router.extend({
	routes: {
		"theatres/:location": "showTheatreList",
		"*home": "showHomeView"
	},

	showHomeView: function() {
		ReactDOM.render(<HomeView />,document.querySelector('#container'))

	},

	showTheatreList: function(inputLocation) {
		console.log("Going in for the fetch")
		this.tc.fetch ({
			url: this.tc.url + "?location=" + inputLocation
		})
		ReactDOM.render(<ListView theatreListInfo={this.tc} map={this.initMap}/>,document.querySelector('#container'))
	},

	initialize: function() {
		this.tc = new TheatreCollection()
		console.log("starting things")
		Backbone.history.start()
	}

})

var tr = new TheatreRouter()




