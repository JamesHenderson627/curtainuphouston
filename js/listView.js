var React = require('react')

import {Header} from "./homeView.js"

var ListView = React.createClass({
	componentDidMount: function() {
		console.log("rendering list ListView")
		console.log(this)
		var self = this
		var updateStuff = function(){self.forceUpdate()}
		this.props.theatreListInfo.on('sync', updateStuff)
	},

	_getTheatreList: function(theatre) {
		return (<SingleList theatreInfo={theatre} />)
	},

	// initMap: function() {
	//   // Create a map object and specify the DOM element for display.
	//   var map = new google.maps.Map(document.getElementById('map'), {
	//     center: {lat: -34.397, lng: 150.644},
	//     scrollwheel: false,
	//     zoom: 8
	//   });
	// },

	render: function() {
		var singleTheatre = this.props.theatreListInfo.models.slice(0, 10)
		return(
			<div>
				<Header />
				<div id="listAndMapContainer">
					<ul className="theatreList">
						{singleTheatre.map(this._getTheatreList)}
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