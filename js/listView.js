var React = require('react')

import {Header} from "./homeView.js"

var ListView = React.createClass({
	componentWillMount: function() {
		window.listView = this
		window.collection = this.props.theatreListInfo
		window.google = google
		console.log("rendering list ListView")
		console.log(this)
		var self = this
		var updateStuff = function(){self.forceUpdate()}
		this.props.theatreListInfo.on('sync', updateStuff)
	},


	_initMap: function() {
		if (!this.props.theatreListInfo.region) return
		var lat = this.props.theatreListInfo.region.center.latitude,
	  		lng = this.props.theatreListInfo.region.center.longitude,
	  		image = {
			    url: "./images/yelp.jpg",
			    scaledSize: new google.maps.Size(20, 20),
			    origin: new google.maps.Point(0, 0),
			    anchor: new google.maps.Point(0, 20)
			  }

	  	var theatreDetails = this.props.theatreListInfo.models.slice(0,10).map(
	  		function(model){
				var origCoords = model.get('location').coordinate,
					title = model.get('name')
				return {title: title, coords: {lat: origCoords.latitude, lng: origCoords.longitude}}
	  		})

	  	setTimeout(function(){
			var	map = new google.maps.Map(document.getElementById('map'), {
			    center: {lat: lat, lng: lng},
			    scrollwheel: false,
			    zoom: 12,
			})
			theatreDetails.forEach(function(detail) {
				var newMarker = new google.maps.Marker({
					map: map,
					position: detail.coords,
					icon: image,
					title: detail.title
				})
				var infoWindow = new google.maps.InfoWindow({
					content: detail.title
				})
				newMarker.addListener("click", function(){
					infoWindow.open(map, newMarker)
				})
			})
		}, 200)
	},

	_getTheatreList: function(theatre) {
		return (<SingleList theatreInfo={theatre} getCoords={this._initMap}/>)
	},

	render: function() {
		var theatreList = this.props.theatreListInfo.models.slice(0, 10)
		this._initMap()
		return(
			<div>
				<Header />
				<div id="listAndMapContainer">
					<ul className="theatreList">
						{theatreList.map(this._getTheatreList)}
					</ul>
					<div id="map">
					</div>
				</div>
			</div>
			)
	}
})

var SingleList = React.createClass({
	componentDidMount: function(){ 
		console.log(this)
	},

	render: function() {
		var name = this.props.theatreInfo.get("name"),
			address = this.props.theatreInfo.attributes.location.address[0],
			city = this.props.theatreInfo.attributes.location.city,
			state = this.props.theatreInfo.attributes.location.state_code,
			zip = this.props.theatreInfo.attributes.location.postal_code
		return(
			<li>
				<h5>{name}</h5>
				<p>{address}<br/>{city}, {state} {zip}</p>
			</li>
			)
	}
})

export default ListView