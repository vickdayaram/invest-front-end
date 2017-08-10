import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
const apiKey = "NKIEQH9ZHQ1ZFJVL"

class Holding extends React.Component {

  state = {
    value: ""
  }

  componentDidMount = () => {
    if(this.props.holding.holding.symbol == "MM"){
      this.setMoneyMarketFundValue()
      return
    }
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.holding.holding.symbol}&interval=15min&outputsize=full&apikey=NKIEQH9ZHQ1ZFJVL`
    fetch(url)
    .then( res => res.json())
    .then( jsonObject => this.calculateValue(jsonObject))
  }

  setMoneyMarketFundValue = () => {
    let moneyMarketValue = this.props.holding.holding.shares
    this.setState({
      value: this.props.holding.holding.shares
    })
    this.props.calculateTotal(moneyMarketValue)
  }

  calculateValue = (jsonObject) => {
    let keysArray = Object.keys(jsonObject["Time Series (15min)"])
    let firstKey = keysArray.shift()
    let secondKeysArray = Object.keys(jsonObject["Time Series (15min)"][firstKey])
    let secondKey = secondKeysArray.filter((key) => key.includes("close"))
    let sharePrice = jsonObject["Time Series (15min)"][firstKey][secondKey]
    let value = (sharePrice * this.props.holding.holding.shares).toFixed(2)
    this.setState({
      value: parseInt(value)
    })
    this.props.calculateTotal(value)
  }

  render(){
    return(

        <Table.Row>
          <Table.Cell textAlign="center"> {this.props.holding.holding.symbol} </Table.Cell>
          <Table.Cell textAlign="center"> {this.props.holding.holding.name} </Table.Cell>
          <Table.Cell textAlign="center"> {this.props.holding.holding.shares} </Table.Cell>
          <Table.Cell textAlign="center"> {this.state.value.toLocaleString()} </Table.Cell>
        </Table.Row>

    )
  }
}

export default Holding
