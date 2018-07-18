import React from 'react';
import PropTypes from 'prop-types';
import './welcomecss.css';
import '../HeaderComponents/header2css.css';
import WelcomeSignupForm from './welcomesignupform.js'
class WelcomeScreen extends React.Component{
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
            <div class="container">
                <div class="leftnav">
                    <center>
                    <h5 class="welcometext">MyCollege is a local network build for your academic needs.</h5>
                    <h5 class="welcometext">Connect.Share.Live</h5>
                    <img class="myimage" src={require('./signuppage.png')}></img>
                    </center>
                </div>
                <div class="rightnav">
                {/* <h4>Signup</h4>
                <form onSubmit={e => this.props.handle_signup(e, this.state)}>
                
                    <p>Username</p>
                    <input type="text" 
                        name="username"
                        value={this.state.username}
                        onChange={this.handle_change}
                    />
                
                    <p>Password</p>
                    <input type="password"
                        name="password"        
                        value={this.state.password}
                        onChange={this.handle_change}
                    /> 
                    <a href="#"><p class="under-input">    
                        Forgotten account ?</p></a>
                
                <input type="submit" value="Create"/> 
                </form> */}
                <WelcomeSignupForm
                handle_signup={this.props.handle_signup}/>

                </div>
            </div>
        );
    }
}

export default WelcomeScreen;
WelcomeScreen.propTypes = {
    handle_signup: PropTypes.func.isRequired
  };