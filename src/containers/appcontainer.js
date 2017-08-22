import React from 'react'
import Welcome from '../components/welcome'
import Accounts from './accounts'
import PerformanceContainer from './performancecontainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { fetchTotalAndAllocation } from '../apiAdapter'
import { Image, Container } from 'semantic-ui-react'



class AppContainer extends React.Component {

  state = {
    currentUser: "",
    portfolioTotal: 0,
    currentAllocation: {},
    totalCcontributions: 0,
    chartData: {}
  }

  componentDidMount = () => {
    fetchTotalAndAllocation()
    .then((json) => {
      let color = "red"
      if(json["portfolio_total"] - json["total_contributions"] > 0){
        color = "green"
      }
      this.setState({
      currentUser: json["username"],
      portfolioTotal: json["portfolio_total"],
      currentAllocation: json["allocation"],
      totalContributions: json["total_contributions"],
      gainOrLoss: json["portfolio_total"] - json["total_contributions"],
      color: color
    })
    })
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
    let colorStops = ['#345995', '#0CF574'];
    let grad = []
    return (
        grad
    )
  }

  formatChartData = () => {
    let rawData = this.state.currentAllocation
    let labels = []
    let data = []
    let backgroundColor = ['#0A2463', '#009DDC', '#F5E2C8']
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
          <div className="accountscontainer">
          <Container text>
            <div className="newuserlandingheader center"> Thanks for Signing Up!</div>
            <div className="newusermessagebody"> Note: Currently Investment Tracker does not account for market hours. Which means you can trade anytime. </div>
            <div className="newusermessagebody"> All trades that are executed while the market is closed will receive the last available closing price for the security. Check out the Nav links above to get started.</div>
            <Image className="newuserlandingimage" src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
          </Container>
          </div>
              :
          <div>
          < Welcome
          currentUser={this.state.currentUser}
          portfolioTotal={this.state.portfolioTotal}
          chartData={this.state.chartData}
          totalContributions={this.state.totalContributions}
          gainOrLoss={this.state.gainOrLoss}
          color={this.state.color}
          />
          </div>
          }
      </div>
    )
  }
}

export default AppContainer
