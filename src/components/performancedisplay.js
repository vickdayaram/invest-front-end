import React from 'react'
import { Icon, Label, Menu, Table, Statistic } from 'semantic-ui-react'
import { fetchAlphaVantage } from '../apiAdapter'
import formatCurrency from 'format-currency'
import { Doughnut } from 'react-chartjs-2'
import { colors } from '../Colors'

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
    display: false,
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


class PerformanceDisplay extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      value: "",
      data: []
    }
  }

  componentDidMount = () => {
    this.formatChartData()
  }

  formatChartData = () => {
    let initialInvestment = this.props.account.holdings[0].transactions[0]["shares_executed"]
    let chartLabels = this.props.account.holdings.map((holding) => holding.holding.symbol)
    let chartData = this.props.account.holdings.map((holding) => holding["holding_by_dollars"])
    let currentBalance = 0.00
    for(let i = 0; i < chartData.length; i++){
      currentBalance = (currentBalance + parseFloat(chartData[i]))
    }
    let gainOrLoss = currentBalance - initialInvestment
    let color = ""
    if(gainOrLoss >= 0.00){
      color = "green"
    } else {
      color = "red"
    }
    let chartDataFormat  =  {
                labels: chartLabels,
                datasets: [{
                backgroundColor: colors,
                borderColor: '#000',
                data: chartData,
                borderWidth: 1
            }]
        }
    this.setState({
      initialInvestment: initialInvestment,
      chartData: chartDataFormat,
      currentBalance: currentBalance,
      gainOrLoss: gainOrLoss,
      color: color
    })

  }

  formatAccountName = () => {
    const account_type = this.props.account.account.account_type
    const account_number = this.props.account.account.account_number
    const account_id = this.props.account.account.id
    return account_type + "   Account Number: " + account_number + "-" + account_id
  }

  render(){
    return(
        <div className="accountperformance">
          <Table celled>
          <Table.Header>

            <Table.Row>
            <Table.HeaderCell
            className="accountHeader"
            colSpan="4"
            textAlign="left"
            > {this.formatAccountName()}
            </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Account Allocation</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Initial Investment</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Current Balance</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Gain or Loss</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          <Table.Row>
            <Table.Cell textAlign="center"> < Doughnut data={this.state.chartData} options={chartOptions} height={200} width={200}/></Table.Cell>
            <Table.Cell textAlign="center"> <Statistic
                          size="tiny"
                          value={formatCurrency(this.state.initialInvestment, options)}
                          /> </Table.Cell>
            <Table.Cell textAlign="center"> <Statistic
                          size="tiny"
                          value={formatCurrency(this.state.currentBalance, options)}
                          /> </Table.Cell>
            <Table.Cell textAlign="center"> <Statistic
                          size="tiny"
                          color={this.state.color}
                          value={formatCurrency(this.state.gainOrLoss, options)}
                          /> </Table.Cell>
          </Table.Row>
          </Table.Body>
          </Table>
        </div>

    )
  }
}

export default PerformanceDisplay
