import React, { Component } from 'react'
import { Form, Grid, Image } from 'semantic-ui-react'
import { fetchStockPerformance } from '../apiAdapter'
import { Line } from 'react-chartjs-2'
import TransactionSearch from './transactionsearch'

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

class StockPerformanceData extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: [],
      symbol: "",
      chartData:[]
    }
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
      <div className="">

      <div className="performanceSearch center">
      <Grid centered>
      <Grid.Row>

        <Grid.Column width={10}>
        <Form >
          <Form.Input>
          <TransactionSearch handleSymbolSelect={this.handleSymbolSelect} />
          </Form.Input>
        </Form>
        </Grid.Column>

      </Grid.Row>
      </Grid>
      </div>

        <div className="center performanceSearchDisplay performanceContainer">
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
