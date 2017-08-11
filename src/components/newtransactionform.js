import React, { Component } from 'react'
import { Form, Grid, Button, Statistic } from 'semantic-ui-react'
import { Redirect } from 'react-router'
import { getAccounts } from '../apiAdapter'
import { sendTransaction } from '../apiAdapter'
import { fetchAlphaVantage } from '../apiAdapter'

class NewTransactionForm extends Component {

  state = {
    accounts: [],
    accountOptions: [],
    account: "",
    transaction: "",
    investment: "",
    amount: "",
    status: false,
    checkedPrice: false,
    shares: 0,
    estimate: 0

  }

  componentDidMount = () => {
    getAccounts()
    .then((jsonObject) => this.formatAccountsToOptions(jsonObject))
  }

  formatAccountsToOptions = (jsonObject) => {
    let accountOptions = []
    let accounts = jsonObject
    for(var i = 0; i < accounts.accounts.length; i++ ){
      accountOptions.push({
        key: accounts.accounts[i].account.account_type + " Account Number: " + accounts.accounts[i].account.account_number + " Funds Available To Trade: " + accounts.accounts[i].holdings[0].holding.shares,
        text: accounts.accounts[i].account.account_type + " Account Number: " + accounts.accounts[i].account.account_number + " Funds Available To Trade: " + accounts.accounts[i].holdings[0].holding.shares,
        value: accounts.accounts[i].account.account_type + " Account Number: " + accounts.accounts[i].account.account_number + " Funds Available To Trade: " + accounts.accounts[i].holdings[0].holding.shares
      })
    }
    this.setState({
      accountOptions: accountOptions
    })
  }

  handleTransactionSelect = (event) => {
    this.setState({
        transaction: event.target.innerText
    })
  }

  handleInvestmentSelect = (event) => {
    this.setState({
        investment: event.target.innerText
    })
  }

  handleAmount = (event) => {
    this.setState({
        amount: event.target.value
    })
  }

  handleAccountSelect = (event) => {
    this.setState({
        account: event.target.innerText
    })
  }

  handlePriceCheck = (event) => {
    event.preventDefault()
    this.setState({
      checkedPrice: true
    })
    fetchAlphaVantage(this.state.investment)
    .then( jsonObject => this.calculateValue(jsonObject))
  }

  calculateValue = (jsonObject) => {
    let keysArray = Object.keys(jsonObject["Time Series (1min)"])
    let firstKey = keysArray.shift()
    let secondKeysArray = Object.keys(jsonObject["Time Series (1min)"][firstKey])
    let secondKey = secondKeysArray.filter((key) => key.includes("open"))
    let sharePrice = jsonObject["Time Series (1min)"][firstKey][secondKey]
    let estimate = this.state.shares * sharePrice
    this.setState({
      estimate: estimate
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let transactionRequest = {
      account: this.state.account,
      transaction: this.state.transaction,
      investment: this.state.investment,
      shares: this.state.shares
    }
    sendTransaction(transactionRequest)
    .then(() => this.redirectToHome())
  }

  redirectToHome = () => {
    this.setState({
      status: true
    })
  }

  handleShares = (event) => {
    this.setState({
      shares: event.target.value
    })
  }

  render() {
    const { value } = this.state
    const options = this.state.accountOptions
    const transactionType =  [
      { key: 'BUY', text: 'BUY', value: 'BUY' },
      { key: 'SELL', text: 'SELL', value: 'SELL' },
    ]
    const investments = [
      { key: 'VTI', text: 'VTI', value: 'VTI' },
      { key: 'BND', text: 'BND', value: 'BND' },
      { key: 'VXUS', text: 'VXUS', value: 'VXUS' },
      { key: 'BNDX', text: 'BNDX', value: 'BNDX' },
    ]
    return (
      <div className="accountscontainer">
      <Grid centered columns={2}>
        <Grid.Column>
          <Form onSubmit={this.handlePriceCheck}>
            <Form.Select label='Select Your Account' options={options} placeholder='Select Your Account' onChange={this.handleAccountSelect} />
            <Form.Select label='Select Your Transaction' options={transactionType} placeholder='Select Transaction' onChange={this.handleTransactionSelect} />
            <Form.Select label='Select Investment' options={investments} placeholder='Select Investment' onChange={this.handleInvestmentSelect} />
            <Form.Input label='Shares'onChange={this.handleShares}  />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Form.Button> Estimate Transaction Total </Form.Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
        <Grid centered columns={2}>


        <Grid.Column textAlign="center" verticalAlign="center">
          {this.state.checkedPrice ?
          <div className="estimate">
            <Statistic value={`$${this.state.estimate.toLocaleString()}`} label="Estimated Value" />
            <Button size="massive" positive onClick={this.handleSubmit}> Submit Trade </Button>
          </div>
          : null}
        </Grid.Column>


        </Grid>
        </Grid.Column>
      </Grid>
      {this.state.status ? < Redirect to="/home" /> : null}
      </div>

    )
  }
}

export default NewTransactionForm
