import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const sample =  {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(60, 180, 75)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    }

    const chartOptions = {
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each bar to be 2px wide and green
      maintainAspectRatio: false,
      title:{
        display: true,
        text: "Current Allocation",
        fontSize: 25,
        position: "top",
        fontColor: "black"
      }
    }

class Welcome extends React.Component {

  state = {
    chartData: {}
  }




  render(){
    return(
      <div className="welcome">
        Welcome {this.props.current_user}, Portfolio Total: ${parseInt(this.props.portfolioTotal).toLocaleString()}
        < Doughnut data={this.props.chartData} options={chartOptions} height={250} width={250}/>
      </div>
    )
  }
}

export default Welcome
