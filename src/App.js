import React, { Component } from 'react';
import Nav from './components/nav'
import AppContainer from './containers/appContainer'
import Authorize from './authorize'
import AuthAdapter from './authAdapter'
import SignUp from './components/signUp'
import Login from './components/login'
import Landing from './components/landing'
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      auth: {
        isLoggedIn: false,
        user: ''
      }
    }
  }


  onLogin = (loginParams) => {
  AuthAdapter.login(loginParams)
    .then( res => {
      //check for an error message
      if( res.error ){
         console.log(res.error)
      }else{
        localStorage.setItem('jwt', res.jwt)
        this.setState({
          auth:{
            isLoggedIn: true,
            user: res.username
          }
        })
      }
      //if error render login again
      //else set the jwt token and forward user to /giphs
    })
  }

  onSignup = (signUpParams) => {
  AuthAdapter.signUp(signUpParams)
    .then( res => {
      //check for an error message
      if( res.error ){
        console.log("do nothing")
      }else{
        localStorage.setItem('jwt', res.jwt)
        this.setState({
          auth:{
            isLoggedIn: true,
            user: res.username
          }
        })
      }
      //if error render login again
      //else set the jwt token and forward user to /giphs
    })
  }


  handleLogout = () => {
    localStorage.clear()
    this.setState({auth: {
      isLoggedIn:false,
      user: ''
    }})
  }


  render() {
    return (
      <div>
        < Router >
          <div>
            I am App
            < Nav />
            <Route exact path="/" component={Landing} />
            <Route path="/home" component={AppContainer} />
            <Route path="/signup" render={()=> <SignUp />} />
            <Route path="/login" render={()=> <Login />} />
          </div>
        < /Router >
      </div>
    );
  }
}

export default App;
