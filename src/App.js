import React, { Component } from 'react';
import Nav from './components/nav'
import AppContainer from './containers/appcontainer'
import Authorize from './authorize'
import AuthAdapter from './authAdapter'
import SignUp from './components/signup'
import Login from './components/login'
import Landing from './components/landing'
import NewAccountForm from './components/newaccountform'
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import history from './components/history'

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
        < Router history={history} >
          <div>
            I am App
            < Nav />
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Authorize(AppContainer)} />

            <Route path="/signup"
            render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/home" /> : <SignUp onSignUp={this.onSignup}/>} />

            <Route path="/login"
            render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/home" /> : <Login onLogin={this.onLogin}/>} />

            <Route path="/logout" render={() => {
            this.handleLogout()
            return (<Redirect to="/"/>)}} />

            <Route exact path="/newaccount" render={() => {
            return (< NewAccountForm />)}} />
          </div>
        < /Router >
      </div>
    );
  }
}

export default App;
