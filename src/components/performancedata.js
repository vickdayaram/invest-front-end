import React, { Component } from 'react'
import { Form, Grid, Statistic } from 'semantic-ui-react'
import { fetchSectorPerformance } from '../apiAdapter'
import { HorizontalBar } from 'react-chartjs-2'

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
    text: "US Sector Performance Data",
    fontSize: 25,
    position: "top",
    fontColor: "black"
  },
  scales: {
            xAxes: [
              {
                  ticks: {
                     callback: function(label, index, labels) {
                       return label.toFixed(2) + "%";
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
  legend:{
    display: false,
    position: "right",
    labels: {
      fontColor: 'rgb(60, 180, 75)'
    }
  },
  tooltips: {
    enabled: true,
    titleFontSize: 24,
  }

}


const options = [
  { key: 'Real-Time Performance', text: 'Real-Time Performance', value: 'Real-Time Performance' },
  { key: '1 Day Performance', text: '1 Day Performance', value: '1 Day Performance' },
  { key: '5 Day Performance', text: '5 Day Performance', value: '5 Day Performance' },
  { key: '1 Month Performance', text: '1 Month Performance', value: '1 Month Performance' },
  { key: '3 Month Performance', text: '3 Month Performance', value: '3 Month Performance' },
  { key: 'Year-to-Date (YTD) Performance', text: 'Year-to-Date (YTD) Performance', value: 'Year-to-Date (YTD) Performance' },
  { key: '1 Year Performance', text: '1 Year Performance', value: '1 Year Performance' },
  { key: '3 Year Performance', text: '3 Year Performance', value: '3 Year Performance' },
  { key: '5 Year Performance', text: '5 Year Performance', value: '5 Year Performance' },
  { key: '10 Year Performance', text: '10 Year Performance', value: '10 Year Performance' }
]

class PerformanceData extends Component {

  state = {
    data: [],
    range: "",
    chartData:[],
    topSector: ""
  }

  componentDidMount = () => {
    fetchSectorPerformance()
    .then((json) => this.setState({
      data: json
    }))
  }

  handlePerformanceRange = (event) => {
    this.setState({
      range: event.target.innerText
    })
    this.filterData(event)
  }

  filterData = (event) => {
    let selected = event.target.innerText
    let keys = Object.keys(this.state.data)
    let dataKey = keys.filter((key) => key.includes(selected))
    let rawData = this.state.data[dataKey]
    this.structureData(rawData, selected)
    debugger
  }

  structureData = (rawData, selected) => {
    let labels = Object.keys(rawData)
    let data = Object.values(rawData).map((value) => parseFloat(value))
    let backgroundColor = []
    let topSector = labels[0]
    let topSectorPercentGain = data[0]
    for(let i = 0; i < data.length; i++){
      if(data[i] > 0){
        backgroundColor.push('rgb(60, 180, 75)')
      } else {
        backgroundColor.push('rgb(230, 25, 75)')
      }
    }
    let chartData = {
                labels: labels,
                datasets: [{
                label: selected,
                backgroundColor: backgroundColor,
                borderColor: 'rgb(255, 99, 132)',
                data: data,
            }]
        }
    this.setState({
      chartData: chartData,
      topSector: topSector,
      topSectorPercentGain: topSectorPercentGain
    })
  }

  render() {
    const { value } = this.state
    return (
      <div>

      <div className="performanceSearch">
      <Grid centered columns={3}>
        <Grid.Row>
        <Grid.Column width={1} textAlign="left">

        </Grid.Column>

        <Grid.Column width={14} textAlign="center">
        {this.state.range.length > 0 ?
        <div className="performance"> Top Sector: {this.state.topSector + " "} <Statistic size="small"color="green" value={this.state.topSectorPercentGain + "%"} /> </div> : <div className="performance"> </div>}
        </Grid.Column>

        <Grid.Column width={1} textAlign="center">

        </Grid.Column>
       </Grid.Row>
      <Grid.Row>
        <Grid.Column width={2}>
        </Grid.Column>
        <Grid.Column width={12}>
        <Form >
          <Form.Select label='Performance Range' options={options} placeholder='Performance Range' onChange={this.handlePerformanceRange} />
        </Form>
        </Grid.Column>
        <Grid.Column width={2}>
        </Grid.Column>
      </Grid.Row>
      </Grid>
      <div>
      {this.state.range.length > 0 ?
        <div className="center">
        < HorizontalBar data={this.state.chartData} width={700}
          height={500}
          options={chartOptions}
          />
        </div>
        : null}
      </div>
      </div>
      </div>

    )
  }
}

export default PerformanceData
