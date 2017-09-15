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
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import NewTransactionForm from './components/newtransactionform'
import PerformanceData from './components/performancedata'
import StockPerformanceData from './components/stockperformancedata'
import Transactions from './containers/transactions'
import TransactionSearch from './components/transactionsearch'
import Accounts from './containers/accounts'
import AccountPerformanceContainer from './containers/accountperformancecontainer'


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
            <Route exact path="/performance" component={Authorize(PerformanceData)}/>
            <Route exact path="/stockperformance" component={Authorize(StockPerformanceData)}/>
            <Route exact path="/investmentquestionaire" component={Authorize(InvestmentQuestionaire)}/>
            <Route exact path="/transactions" component={Authorize(Transactions)}/>
            <Route exact path="/transactionsearch" component={Authorize(TransactionSearch)}/>
            <Route exact path="/balancesandholdings" component={Authorize(Accounts)}/>
            <Route exact path="/accountperformance" component={Authorize(AccountPerformanceContainer)}/>

          </div>
        < /Router >
      </div>
    );
  }
}

export default App;
