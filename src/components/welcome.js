import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Table, Statistic, Loader, Grid } from 'semantic-ui-react'
import Gradient from 'gradient-color'

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
        text: "Current Portfolio Allocation",
        fontSize: 25,
        position: "top",
        fontColor: "black"
      },
      legend:{
        display: true,
        position: "top",
        fullWidth: false,
        boxWidth: 10
      },
      cutoutPercentage: 35,
    }

class Welcome extends React.Component {



  render(){
    return(
      <div className="welcomebackground">
        <Grid textAlign="center">
        <Grid.Row>
        <Grid.Column width={8}>
        <div className="welcomeText3"> Welcome {this.props.current_user} </div>
        </Grid.Column>

        <Grid.Column width={8}>
        {Object.keys(this.props.chartData).length > 0 ?
          <Statistic label="Total Portfolio Value" size="small" value={`$${parseInt(this.props.portfolioTotal).toLocaleString()}`} />
          :
          <div> < Loader size="massive" active inline="centered" /> </div>
        }
        </Grid.Column>
        </Grid.Row>

        <Grid.Row>
        <Grid.Column stretched={true}>
        {Object.keys(this.props.chartData).length > 0 ?
          < Doughnut data={this.props.chartData} options={chartOptions} height={600} width={600}/>
          :
        <div className="welcomeLoader"> < Loader size="massive" active inline="centered" /> </div>
        }
        </Grid.Column>
        </Grid.Row>
        </Grid>

      </div>
    )
  }
}

export default Welcome
