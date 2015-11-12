var React = require('react')

import {Header} from "./homeView.js"
import {Background} from "./signUp.js"

var ListView = React.createClass({

	componentWillMount: function() {
		console.log("rendering list ListView")
		console.log(this)
		this.forceUpdate()
		// var updateStuff = function(){self.forceUpdate()}
	},

	componentWillUpdate: function() {
		this._initMap()	
	},

	_getTheatreList: function(theatre) {
		return (<SingleList theatreInfo={theatre} />)
	},

	_initMap: function() {
			console.log("----initing map-----")
			console.log(this.props)
			if (!this.props.center) return
			var center = this.props.center,
		  		image = {
				    url: "./images/shakes.png",
				    scaledSize: new google.maps.Size(50, 50),
				    origin: new google.maps.Point(0, 0),
				    anchor: new google.maps.Point(0, 20)
				  }

			var	map = new google.maps.Map(document.getElementById('map'), {
			    center: center,
			    scrollwheel: false,
			    zoom: 13
			})


			var theatreDetails = this.props.theatreListInfo.slice(0,10)
			console.log(theatreDetails)

			theatreDetails.forEach(function(detail) {
				var newMarker = new google.maps.Marker({
					map: map,
					position: detail.get("latlng"),
					icon: image,
					title: detail.get("name")
				})
				var infoWindow = new google.maps.InfoWindow({
					content: detail.get("name")
				})
				newMarker.addListener("click", function(){
					infoWindow.open(map, newMarker)
				})
			})	
		},

	render: function() {
		var theatreList = this.props.theatreListInfo.slice(0, 10)
		// this._initMap()
		return(
			<div>
				<Header logInUser={this.props.logInUser}/>
				<Background />
				<div id="listAndMapContainer">
					<ul className="theatreList">
						{theatreList.map(this._getTheatreList)}
					</ul>
					<div id="mapContainer">
						<div id="map"></div>
					</div>
				</div>
			</div>
			)
	}
})

var SingleList = React.createClass({
	// componentDidMount: function(){ 
	// 	console.log(this)
	// },
	
	_goToProfile: function(source, id) {
		var id = this.props.theatreInfo.get("id"),
			source = this.props.theatreInfo.attributes.source()
		location.hash = "profile/" + source + "/" + id	
	},

	render: function() {
		var name = this.props.theatreInfo.get("name"),
			address = this.props.theatreInfo.get("address"),
			city = this.props.theatreInfo.get("city"),
			state = this.props.theatreInfo.get("state"),
			zip = this.props.theatreInfo.get("zip")
		return(
			<li>
				<h5 id="theatreName" onClick={this._goToProfile}>{name}</h5>
				<p>{address}<br/>{city}, {state} {zip}</p>
			</li>
			)
	}
})

export default ListView