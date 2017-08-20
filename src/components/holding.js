import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { fetchAlphaVantage } from '../apiAdapter'
import formatCurrency from 'format-currency'

class Holding extends React.Component {

  state = {
    value: ""
  }

  componentDidMount = () => {
    if(this.props.holding.holding.symbol == "MM"){
      this.setMoneyMarketFundValue()
      return
    }
    let symbol = this.props.holding.holding.symbol
    fetchAlphaVantage(symbol)
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
    let keysArray = Object.keys(jsonObject["Time Series (1min)"])
    let firstKey = keysArray.shift()
    let secondKeysArray = Object.keys(jsonObject["Time Series (1min)"][firstKey])
    let secondKey = secondKeysArray.filter((key) => key.includes("open"))
    let sharePrice = jsonObject["Time Series (1min)"][firstKey][secondKey]
    let value = (sharePrice * this.props.holding.holding.shares).toFixed(2)
    this.setState({
      value: value
    })
    this.props.calculateTotal(value)
  }

  render(){
    let options = { format: '%s%v', symbol: '$' }
    return(

        <Table.Row>
          <Table.Cell textAlign="center"> {this.props.holding.holding.symbol} </Table.Cell>
          <Table.Cell textAlign="center"> {this.props.holding.holding.name} </Table.Cell>
          {this.props.holding.holding.symbol === "MM" ?
          <Table.Cell textAlign="center"> {this.props.holding.holding.shares.toLocaleString()} </Table.Cell>
          :
          <Table.Cell textAlign="center"> {parseInt(this.props.holding.holding.shares)} </Table.Cell>
          }
          <Table.Cell textAlign="center"> {formatCurrency(this.state.value, options)} </Table.Cell>
        </Table.Row>

    )
  }
}

export default Holding
