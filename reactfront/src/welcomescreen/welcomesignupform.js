import React from 'react';
import PropTypes from 'prop-types';
import './signupformcss.css';

class WelcomeSignupForm extends React.Component{
    state = {
        username: '',
        password: ''
      };

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
          const newState = { ...prevstate };
          newState[name] = value;
          return newState;
        });
      };

    render(){
        return(
            <div class="formcontainer">
            <div class="login">
		<div class="login-screen">
			<div class="app-title">
				<h1>Signup</h1>
			</div>  

			<form class="login-form" onSubmit={e => this.props.handle_signup(e, this.state)}>
				<div class="control-group">
                <input 
                name="username"
                type="text" 
                id="signinput" class="login-field" 
                value={this.state.username}
                onChange={this.handle_change} 
                placeholder="Username"
                 id="login-name">
                 </input>
				<label class="login-field-icon fui-user" for="login-name"></label>
				</div>

				<div class="control-group">
				<input name="password" type="password" id="signinput" class="login-field" value={this.state.password}
                        onChange={this.handle_change} placeholder="Password" id="login-pass"></input>
				<label class="login-field-icon fui-lock" for="login-pass"></label>
				</div>
                <input class="btn btn-primary btn-large btn-block"  type="submit" value="Create"></input>
				
			</form>
		</div>
	</div>
    </div>
        );
    }
}

export default WelcomeSignupForm;
WelcomeSignupForm.propTypes = {
    handle_signup: PropTypes.func.isRequired
  };
