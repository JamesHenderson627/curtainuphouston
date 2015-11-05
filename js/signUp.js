var React = require('react')

var SignUpScreen = React.createClass({
	_getNewUserData: function(){
		var username = this.refs.username.getDOMNode().value,
			password = this.refs.password.getDOMNode().value
			this.props.sendUserData(username, password)
		
	},

	render: function(){

		return(

			<div id="signUp">
				<h1>Sign Up!</h1>
				<div id="signUpBox">
					<input type="text" placeholder="Your Username" ref="username"/>
					<input type="password" placeholder="Your Password" ref="password"/>
				</div>
				<button onClick={this._getNewUserData}>Create User</button>
			</div>	
			)
	}
})

export default SignUpScreen