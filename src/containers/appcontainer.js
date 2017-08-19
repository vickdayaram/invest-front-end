import React from 'react'
import Welcome from '../components/welcome'
import Accounts from './accounts'
import PerformanceContainer from './performancecontainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { fetchTotalAndAllocation } from '../apiAdapter'
import { Image } from 'semantic-ui-react'

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
    .then(() => {
      if(!this.state.portfolioTotal){
        return
      } else {
        this.formatChartData()
      }
    })
  }

  formatChartData = () => {
    let rawData = this.state.currentAllocation
    let labels = []
    let data = []
    let backgroundColor = []
    let label = ""
    let value = ""
    let val = Math.floor(1000 + Math.random() * 9000)
    for(let i = 0; i < rawData.length; i++){
      let label = Object.keys(rawData[i]).pop()
      let value = Object.values(rawData[i]).pop().toFixed(2)
      labels.push(label)
      data.push(value)
      if(label === "MM"){
        backgroundColor.push('#1B9112')
      } else if( i % 2 == 0){
        backgroundColor.push('#C61919')
      } else {
        backgroundColor.push('#202759')
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
          {isNaN(this.state.portfolioTotal) ?
          <div className="landingHeader center">
            <div> Thanks for signing up! </div>
            <div className="landingBody"> Check out the Nav links above to get Started </div>
            <Image className="accountscontainer" src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
          </div>
              :
          <div>
          < Welcome current_user={this.state.current_user} portfolioTotal={this.state.portfolioTotal} chartData={this.state.chartData}/>
          < Accounts  />
          </div>
          }
      </div>
    )
  }
}

export default AppContainer
