import React from 'react'
import Welcome from '../components/welcome'
import Accounts from './accounts'
import { Route } from 'react-router-dom'

class AppContainer extends React.Component {

  state = {
    current_user: "",
    portfolioTotal: 0
  }

  setCurrentUser = (current_user) => {
    this.setState({
      current_user: current_user
    })
  }

  portfolioTotal = (accountBalance) => {
    let addingBalance = this.state.portfolioTotal + parseInt(accountBalance)
    this.setState({
      portfolioTotal: addingBalance
    })
    console.log(addingBalance)
  }

  render(){
    return (
      <div className="home">
        < Welcome current_user={this.state.current_user}/>
        < Accounts setCurrentUser={this.setCurrentUser} portfolioTotal={this.portfolioTotal}/>
      </div>
    )
  }
}

export default AppContainer
