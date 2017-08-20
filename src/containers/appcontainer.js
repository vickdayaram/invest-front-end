import React from 'react'
import Welcome from '../components/welcome'
import Accounts from './accounts'
import PerformanceContainer from './performancecontainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { fetchTotalAndAllocation } from '../apiAdapter'
import { Image } from 'semantic-ui-react'
import Gradient from 'gradient-color'

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

  generateGradient = (rawData) => {
    let n = rawData.length
    return (
      Gradient([
        '#313B72',
        '#3E92CC',
        '#EBEBEB'
      ], n)
    )
  }

  formatChartData = () => {
    let rawData = this.state.currentAllocation
    let labels = []
    let data = []
    let backgroundColor = this.generateGradient(rawData)
    let label = ""
    let value = ""
    for(let i = 0; i < rawData.length; i++){
      let label = Object.keys(rawData[i]).pop()
      let value = Object.values(rawData[i]).pop().toFixed(2)
      labels.push(label)
      data.push(value)
    }

    let chartData  =  {
                labels: labels,
                datasets: [{
                label: "Portfolio Allocation",
                backgroundColor: backgroundColor,
                borderColor: '#000',
                data: data,
                borderWidth: 1
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
          </div>
          }
      </div>
    )
  }
}

export default AppContainer
