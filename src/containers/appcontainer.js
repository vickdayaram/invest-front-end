import React from 'react'
import Welcome from '../components/welcome'
import { fetchTotalAndAllocation } from '../apiAdapter'
import { colors } from '../Colors'

class AppContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      currentUser: "",
      portfolioTotal: 0,
      currentAllocation: {},
      totalCcontributions: 0,
      chartData: {}
    }
  }

  componentDidMount = () => {
    fetchTotalAndAllocation()
    .then((json) => {
      let color = "red"
      if(json["portfolio_total"] - json["total_contributions"] >= 0){
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

  formatChartData = () => {
    let rawData = this.state.currentAllocation
    let labels = []
    let data = []
    let backgroundColor = colors
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
      </div>
    )
  }
}

export default AppContainer
