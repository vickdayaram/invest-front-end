import React, { Component } from 'react'
import { Form, Grid, Statistic, Image } from 'semantic-ui-react'
import { fetchSectorPerformance } from '../apiAdapter'
import { HorizontalBar } from 'react-chartjs-2'
import { chartOptions, rangeOptions } from '../helpers/performancedatahelpers'

class PerformanceData extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: [],
      range: "",
      chartData:[],
      topSector: ""
    }
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
      <div className="performanceContainer">
      <div className="performanceSearch">
      <Grid centered columns={3}>
        <Grid.Row>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={12}>
          <Form >
            <Form.Select options={rangeOptions} placeholder='Performance Range' onChange={this.handlePerformanceRange} />
          </Form>
          </Grid.Column>
          <Grid.Column width={2}>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={14} textAlign="center">
          {this.state.range.length > 0 ?
          <div className="performance"> Top Sector: {this.state.topSector + " "} <Statistic size="small"color="green" value={this.state.topSectorPercentGain + "%"} /> </div> : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div>
      {this.state.range.length > 0 ?
        <div className="center performanceSearchDisplay performanceContainer">
        < HorizontalBar data={this.state.chartData} width={700}
          height={500}
          options={chartOptions}
          />
        </div>
        :
        <div className="center performanceSearchDisplay performanceContainer">
          <div className="loaderDisplay">
            <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
          </div>
        </div>
      }
      </div>
    </div>
  </div>
    )
  }
}

export default PerformanceData
