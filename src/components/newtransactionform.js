import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { Redirect } from 'react-router'


const baseUrl = 'http://localhost:3000/api/v1'

class NewTransactionForm extends Component {

  state = {
    accounts: [],
    accountOptions: [],
    account: "",
    transaction: "",
    investment: "",
    amount: "",
    status: false

  }

  componentDidMount = () => {
    fetch(`${baseUrl}/getaccounts`, {
      method: 'GET',
      headers: this.headers(),
    }).then(res => res.json())
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

  handleSubmit = (event) => {
    event.preventDefault()
    let transactionRequest = {
      account: this.state.account,
      transaction: this.state.transaction,
      investment: this.state.investment,
      amount: this.state.amount
    }
    fetch(`${baseUrl}/transact`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(transactionRequest)
    }).then(res => res.json())
      .then((res) => console.log(res))
    .then(() => this.redirectToHome())
  }

  redirectToHome = () => {
    this.setState({
      status: true
    })
  }

  headers () {
    return {
      'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    }
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
      <div>
      New transaction form template to begin
      <Grid centered columns={3}>
        <Grid.Column>
          <Form onSubmit={this.handleSubmit}>
            <Form.Select label='Select Your Account' options={options} placeholder='Select Your Account' onChange={this.handleAccountSelect} />
            <Form.Select label='Select Your Transaction' options={transactionType} placeholder='Select Transaction' onChange={this.handleTransactionSelect} />
            <Form.Select label='Select Investment' options={investments} placeholder='Select Investment' onChange={this.handleInvestmentSelect} />
            <Form.Input label='Amount' placeholder='$' onChange={this.handleAmount}  />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Form.Button>Submit</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
      {this.state.status ? < Redirect to="/home" /> : null}
      </div>

    )
  }
}

export default NewTransactionForm
