import React, { Component } from 'react'
import { Form, Grid, Statistic, Image } from 'semantic-ui-react'
import { fetchStockPerformance } from '../apiAdapter'
import { Line } from 'react-chartjs-2'
import TransactionSearch from './transactionsearch'

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
  maintainAspectRatio: false,
  title:{
    display: true,
    text: "Stock Performance",
    fontSize: 25,
    position: "top",
    fontColor: "black"
  },
  legend: {
    display: false
  },
  scales: {
            xAxes: [
              {
                  ticks: {
                     callback: function(label, index, labels) {
                       return label;
                     }
                  }
              }
            ],
            yAxes: [
              {
                  ticks: {
                     callback: function(label, index, labels) {
                       return label;
                     },
                     fontSize: 18,
                     fontColor: 'black'
                  },

                  display: true,

              }
            ]
        },

}


const options = [
  { key: 'VTI', text: 'VTI', value: 'VTI' },
  { key: 'VXUS', text: 'VXUS', value: 'VXUS' },
  { key: 'BND', text: 'BND', value: 'BND' },
  { key: 'BNDX', text: 'BNDX', value: 'BNDX' },
]

class StockPerformanceData extends Component {

  state = {
    data: [],
    symbol: "",
    chartData:[]
  }

  handleSymbolSelect = (symbol) => {

    this.setState({
      symbol: symbol
    })
    fetchStockPerformance(symbol)
    .then((jsonObject) => this.structureData(jsonObject))
  }

  structureData = (jsonObject) => {
    let selected
    let rawData = jsonObject["Monthly Time Series"]
    let labels = Object.keys(rawData)
    let data = Object.values(rawData).map((value) => parseFloat(value["1. open"]))
    let chartData = {
                labels: labels.reverse(),
                datasets: [{
                backgroundColor: 'rgb(60, 180, 75)',
                borderColor: 'rgb(255, 99, 132)',
                data: data.reverse(),
            }]
        }
    this.setState({
      chartData: chartData,
    })
  }

  render() {
    const { value } = this.state
    return (
      <div className="performanceContainer">

      <div className="performanceSearch">
      <Grid centered columns={3}>
      <Grid.Row>
        <Grid.Column width={2}>
        </Grid.Column>
        <Grid.Column width={12}>
        <Form >
          <Form.Input>
          <TransactionSearch handleSymbolSelect={this.handleSymbolSelect} />
          </Form.Input>
        </Form>
        </Grid.Column>
        <Grid.Column width={2}>
        </Grid.Column>
      </Grid.Row>
      </Grid>
      </div>

        <div className="center performanceSearch performanceContainer">
        {this.state.symbol ?
          < Line
          data={this.state.chartData}
          options={chartOptions}
          height={500}
          width={700}
          />
          :
          <div className="loaderDisplay">
            <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
          </div>
        }
      
      </div>
      </div>

    )
  }
}

export default StockPerformanceData
