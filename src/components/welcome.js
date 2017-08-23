import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Table, Statistic, Loader, Grid, Menu, Segment, Image } from 'semantic-ui-react'
import formatCurrency from 'format-currency'

const options = { format: '%s%v', symbol: '$' }

const chartOptions = {
  maintainAspectRatio: false,
  title:{
    display: false,
    text: "Portfolio Allocation",
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
  tooltips: {
              enabled: true,
              legend: false,
              backgroundColor: 'rgba(0,0,0,0.8)',
              bodyFontSize: 16,
              callbacks: {
                label: function(tooltipItem, data) {
                   let label = data.labels[tooltipItem.index]
                   let value = data.datasets[0].data[tooltipItem.index]
                   return label + " " + formatCurrency(value, options)
                }
              }
            }

}

class Welcome extends React.Component {

  state = { activeItem: 'Photo of the Moment' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderPortfolioPerformance = () => {
    let options = { format: '%s%v', symbol: '$' }
    return (
      <div className="welcomePerformance">
        <Table size="large" textAlign="center">

         <Table.Body>
           <Table.Row>
             <Table.Cell textAlign="left"> Portfolio Value </Table.Cell>
             <Table.Cell textAlign="right"><Statistic size="tiny" value={formatCurrency(this.props.portfolioTotal, options)}/></Table.Cell>
           </Table.Row>
           <Table.Row>
              <Table.Cell textAlign="left"> Portfolio Contributions </Table.Cell>
              <Table.Cell textAlign="right"> <Statistic size="tiny" value={formatCurrency(this.props.totalContributions, options)} /></Table.Cell>
           </Table.Row>
           <Table.Row>
              <Table.Cell textAlign="left"> Gain or Loss </Table.Cell>
              <Table.Cell textAlign="right"> <Statistic size="tiny" value={formatCurrency(this.props.gainOrLoss, options)} color={this.props.color}/></Table.Cell>
           </Table.Row>
         </Table.Body>
         </Table>
        </div>
      )
  }

  renderPortfolioAllocation = () => {
    return (
      < Doughnut data={this.props.chartData} options={chartOptions} height={400} width={400}/>
    )
  }

  renderPhotoOfTheMoment = () => {
    return (
      < Image centered src="https://unsplash.it/2400/1200/?random" size="massive" alt="Photo of the Moment" />
    )
  }

  currentMenuDisplay = () => {
    let currentMenu = this.state.activeItem
    if(currentMenu === "Photo of the Moment"){
      return this.renderPhotoOfTheMoment()
    } else if( currentMenu === "Portfolio Performance"){
      return this.renderPortfolioPerformance()
    } else if( currentMenu === "Portfolio Allocation"){
      return this.renderPortfolioAllocation()
    }
  }

  render(){
    let options = { format: '%s%v', symbol: '$' }
    const { activeItem } = this.state
    return(
      <div className="welcomebackground">
        <Grid textAlign="center">
        <Grid.Row>
        <Grid.Column width={8}>
        {this.props.currentUser.length > 0 ?
        <div className="welcomeText3"> Welcome {this.props.currentUser} </div>
        :
        null
        }
        </Grid.Column>

        <Grid.Column width={8}>
        {Object.keys(this.props.chartData).length > 0 ?
          <Statistic label="Total Portfolio Value" size="small" value={formatCurrency(this.props.portfolioTotal, options)} />
          :
          null
        }
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column stretched={true}>
            {Object.keys(this.props.chartData).length > 0 ?
            <div>
                <div>
                  <Menu attached='top' tabular>
                    <Menu.Item name='Photo of the Moment' active={activeItem === 'Photo of the Moment'} onClick={this.handleItemClick} />
                    <Menu.Item name='Portfolio Performance' active={activeItem === 'Portfolio Performance'} onClick={this.handleItemClick} />
                    <Menu.Item name='Portfolio Allocation' active={activeItem === 'Portfolio Allocation'} onClick={this.handleItemClick} />
                  </Menu>

                  <Segment attached='bottom'>
                    <div className="welcomeMenu">
                    {this.currentMenuDisplay()}
                    </div>
                  </Segment>
                </div>
            </div>
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
