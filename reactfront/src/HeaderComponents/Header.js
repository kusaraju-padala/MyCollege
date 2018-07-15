import React from 'react';
import PropTypes from 'prop-types';
import './headercss.css';
class Header extends React.Component {
    render() {
        return (
            <div class="menu">
                <div class="row container-fluid">
                {/* <div class=""><img class="my-icon" src={require('./iconmycollege.jpg')}></img></div> */}
                    <div class="col-md-6 navbar-header">
                        <img class="my-icon" src={require('./iconmycollege.jpg')}></img>
                        <a href="/">Mycollege</a>
                    </div>
                    <div class="col-md-6">
                    {this.props.logged_in 
                    ?<div class="head-links navbar-nav"><a class="links-head nav-item nav-link" onClick={this.props.handle_logout}>Logout</a></div>
                    :<div class="head-links navbar-nav"><a class="links-head nav-item nav-link">Login</a></div>
                    }
                    </div>
                </div>
            </div>
        );
    }
}
export default Header
Header.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    handle_logout:PropTypes.func.isRequired,
    display_form:PropTypes.func.isRequired
  };