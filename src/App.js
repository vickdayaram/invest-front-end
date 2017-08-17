import React, { Component } from 'react';
import Nav from './components/nav'
import AppContainer from './containers/appcontainer'
import Authorize from './authorize'
import AuthAdapter from './authAdapter'
import SignUp from './components/signup'
import Login from './components/login'
import Landing from './components/landing'
import NewAccountForm from './components/newaccountform'
import InvestmentQuestionaire from './components/investmentquestionaire'
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import NewTransactionForm from './components/newtransactionform'
import PerformanceContainer from './containers/performancecontainer'
import StockPerformanceData from './components/stockperformancedata'
import Transactions from './containers/transactions'


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      auth: {
        isLoggedIn: false,
        user: ''
      },
      errors: ""
    }
  }

  componentDidMount = () => {
    if(localStorage.getItem('jwt')){
      this.setState({
        auth:{
          isLoggedIn: true,
        }
      })
    }
  }

  onLogin = (loginParams) => {
  AuthAdapter.login(loginParams)
    .then( res => {
      //check for an error message
      if( res.errors ){
         this.setState({
           errors: res.errors
         })
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
      if( res.errors ){
        this.setState({
          errors: res.errors
        })
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
            < Nav isLoggedIn={this.state.auth.isLoggedIn}/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Authorize(AppContainer)} />

            <Route path="/signup"
            render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/home" /> : <SignUp onSignUp={this.onSignup} errors={this.state.errors}/>} />

            <Route path="/login"
            render={()=> this.state.auth.isLoggedIn ?
            <Redirect to="/home" /> : <Login onLogin={this.onLogin} errors={this.state.errors}/>} />

            <Route path="/logout" render={() => {
            this.handleLogout()
            return (<Redirect to="/"/>)}} />

            <Route exact path="/newaccount" component={Authorize(NewAccountForm)}/>
            <Route exact path="/transact" component={Authorize(NewTransactionForm)}/>
            <Route exact path="/performance" component={Authorize(PerformanceContainer)}/>
            <Route exact path="/stockperformance" component={Authorize(StockPerformanceData)}/>
            <Route exact path="/investmentquestionaire" component={Authorize(InvestmentQuestionaire)}/>
            <Route exact path="/transactions" component={Authorize(Transactions)}/>

          </div>
        < /Router >
      </div>
    );
  }
}

export default App;
