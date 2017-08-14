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
    currentAllocation: {},
    chartData: {}
  }

  componentDidMount = () => {
    fetchTotalAndAllocation()
    .then((json) => this.setState({
      current_user: json["username"],
      portfolioTotal: json["portfolio_total"],
      currentAllocation: json["allocation"]
    }))
    .then(() => this.formatChartData())
  }

  formatChartData = () => {
    let rawData = this.state.currentAllocation
    let labels = []
    let data = []
    let backgroundColor = []
    let label = ""
    let value = ""
    for(let i = 0; i < rawData.length; i++){
      let label = Object.keys(rawData[i]).pop()
      let value = Object.values(rawData[i]).pop().toFixed(2)
      labels.push(label)
      data.push(value)
      if(label === "MM"){
        backgroundColor.push('#E0E1DD')
      } else if(label === "VTI" || label === "VXUS"){
        backgroundColor.push('#0D1B2A')
      } else {
        backgroundColor.push('#0D3B66')
      }
    }
    let chartData  =  {
                labels: labels,
                datasets: [{
                label: "Portfolio Allocation",
                backgroundColor: backgroundColor,
                borderColor: '#000',
                data: data,
            }]
        }
    this.setState({
      chartData: chartData
    })
  }

  render(){
    return (
      <div className="home">

          < Welcome current_user={this.state.current_user} portfolioTotal={this.state.portfolioTotal} chartData={this.state.chartData}/>
          < Accounts  />


      </div>
    )
  }
}

export default AppContainer
