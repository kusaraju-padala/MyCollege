import React from 'react';
import PropTypes from 'prop-types';
import './header2css.css';
class Header2 extends React.Component {

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

    render() {
        return (
            <div class="header">
                <h1>MyCollege</h1>
                {this.props.logged_in
                ?
                <div><button onClick={this.props.handle_logout}>Logout</button></div>
                : <form onSubmit={e => this.props.handle_login(e, this.state)}>
                <div class="input-text">
                    <p>Username</p>
                    <input type="text" 
                        name="username"
                        value={this.state.username}
                        onChange={this.handle_change}
                    />
                </div>
                <div class="input-pass">
                    <p>Password</p>
                    <input type="password"
                        name="password"        
                        value={this.state.password}
                        onChange={this.handle_change}
                    /> 
                    <a href="#"><p class="under-input">    
                        Forgotten account ?</p></a>
                </div>
                <input type="submit" value="Login"/> 
                </form>
                }
            </div>
        );
    }
}
export default Header2
Header2.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    handle_logout:PropTypes.func.isRequired,
    handle_login: PropTypes.func.isRequired
  };