import React from 'react'
import Welcome from '../components/welcome'
import Accounts from './accounts'
import PerformanceContainer from './performancecontainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'

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

  portfolioTotal = (portfolioTotal) => {
    this.setState({
      portfolioTotal: portfolioTotal
    })
    console.log(portfolioTotal)
  }

  render(){
    return (
      <div className="home">

          < Welcome current_user={this.state.current_user} portfolioTotal={this.state.portfolioTotal}/>
          < Accounts setCurrentUser={this.setCurrentUser} portfolioTotal={this.portfolioTotal}/>


      </div>
    )
  }
}

export default AppContainer
