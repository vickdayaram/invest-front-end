import React from 'react'
import Welcome from '../components/welcome'
import Accounts from './accounts'
import PerformanceContainer from './performancecontainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { fetchTotalAndAllocation } from '../apiAdapter'

class AppContainer extends React.Component {

  state = {
    current_user: "",
    portfolioTotal: 0,
    currentAllocation: {}
  }

  componentDidMount = () => {
    fetchTotalAndAllocation()
    .then((json) => this.setState({
      current_user: json["username"],
      portfolioTotal: json["portfolio_total"],
      currentAllocation: json["allocation"]
    }))
  }

  render(){
    return (
      <div className="home">

          < Welcome current_user={this.state.current_user} portfolioTotal={this.state.portfolioTotal} currentAllocation={this.state.currentAllocation}/>
          < Accounts  />


      </div>
    )
  }
}

export default AppContainer
