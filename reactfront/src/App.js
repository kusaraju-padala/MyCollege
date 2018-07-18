import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Cookies from 'universal-cookie';
import PostsNav from './posts_handle/RenderPosts';
import Header from './HeaderComponents/Header';
import Header2 from './HeaderComponents/Header2';
import WelcomeScreen from './welcomescreen/welcomenavs';
class App extends Component {
  cookies = new Cookies();
  constructor(props) {
    super(props);
    if (this.cookies.get('userToken')){
      this.state = {
        displayed_form: '',
        logged_in:  true ,
        username: this.cookies.get('username')
      };
    }
    else{
      this.state = {
        displayed_form: '',
        logged_in: false,
        username: ''
      };
    }
    
  }

  componentDidMount() {
    if (this.state.logged_in) {
      // fetch('http://localhost:8000/api/current_user/', {
      //   headers: {
      //     Authorization: `JWT ${this.cookies.get('userToken')}`
      //   }
      // })
      //   .then(res => res.json())
      //   .then(json => {
      //     this.setState({ username: this.cookies.get('username') });
      //   });
      // this.setState({ username: this.cookies.get('username') });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if('token' in json){
          localStorage.setItem('token', json.token);
          this.cookies.set('userToken', json.token, { path: '/',expires: new Date(Date.now()+2.506e+9)} );
          this.cookies.set('username',json.user.username, {path : '/', expires: new Date(Date.now()+2.506e+9)})
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.user.username
        });
        }
        else{
          this.setState({
            displayed_form: '',
            username: ''
        });
        }
        
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if('token' in json){
          localStorage.setItem('token', json.token);
          this.cookies.set('userToken', json.token, { path: '/',expires: new Date(Date.now()+2.506e+9)} );
          this.cookies.set('username',json.username, {path : '/', expires: new Date(Date.now()+2.506e+9)});
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.username
          });
        }
        else{
          this.setState({
            displayed_form: '',
            username: ''
        });
        }
        
      });
  };

  handle_logout = () => {
    this.cookies.remove('userToken');
    this.cookies.remove('username');
    // localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div class="Padams">
      {/* <Header
      logged_in={this.state.logged_in}
      handle_logout={this.handle_logout}
      display_form={this.display_form}
      /> */}
      <Header2
      logged_in={this.state.logged_in}
      handle_logout={this.handle_logout}
      handle_login={this.handle_login}
      />
      <div className="App">
          {/* <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        /> 
        {form}  */}
        
          {this.state.logged_in
            ? <div>
              <h3>{`Hello, ${this.state.username}`}</h3>
              <PostsNav
                userToken={this.cookies.get('userToken')}
              />
              </div>
            : 
            <WelcomeScreen
              handle_signup={this.handle_signup} 
              />
            }
        
        
      </div>
      </div>
    );
  }
}

export default App;


//class App extends Component {
//  render() {
//    return (
//      <div className="App">
//        <header className="App-header">
//          <img src={logo} className="App-logo" alt="logo" />
//          <h1 className="App-title">Welcome to React</h1>
//        </header>
//        <p className="App-intro">
//          To get started, edit <code>src/App.js</code> and save to reload.
//        </p>
//      </div>
//    );
//  }
//}
//
//export default App;
