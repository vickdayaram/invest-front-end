import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Table, Statistic } from 'semantic-ui-react'

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
        display: false,
        text: "Current Allocation",
        fontSize: 25,
        position: "top",
        fontColor: "black"
      },
      legend:{
        display: true,
        position: "bottom",
        fullWidth: false,
        boxWidth: 15
      },
      cutoutPercentage: 0,
    }

class Welcome extends React.Component {

  state = {
    chartData: {}
  }




  render(){
    return(
      <div className="welcome2">
        <div className="welcomeText"> Welcome {this.props.current_user} </div>

        <div className="dashboard">
        <Table size="small">
          <Table.Header >
            <Table.HeaderCell
            className="accountHeader"
            colSpan="2"
            textAlign="left"
            > <div className="portfolioHeader">Portfolio Dashboard </div>
            </Table.HeaderCell>
            <Table.Row textAlign="center">
              <Table.HeaderCell width={8}>Current Portfolio Allocation</Table.HeaderCell>
              <Table.HeaderCell width={8}>Total Portfolio Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center" width={8}> < Doughnut data={this.props.chartData} options={chartOptions} height={200} width={200}/> </Table.Cell>
              <Table.Cell textAlign="center" width={8}> <Statistic size="small" value={`$${parseInt(this.props.portfolioTotal).toLocaleString()}`} /> </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        </div>
      </div>
    )
  }
}

export default Welcome
