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
    currentInvestment: "",
    currentShares: 0,
    amount: "",
    status: false,
    checkedPrice: false,
    shares: 0,
    estimate: 0,
    fundsAvailable: 0,
    resultingBalance: 0,
    selectedAccountNumber: 0,
    investmentOptions: []
  }

  componentDidMount = () => {
    getAccounts()
    .then((jsonObject) => this.formatAccountsToOptions(jsonObject))
  }

  formatAccountsToOptions = (jsonObject) => {
    let accountOptions = []
    let accounts = jsonObject.accounts
    for(let i = 0; i < accounts.length; i++ ){
      accountOptions.push({
        key: accounts[i].account.account_type + " Account Number: " + accounts[i].account.account_number + " Funds Available To Trade: " + accounts[i].holdings[0].holding.shares,
        text: accounts[i].account.account_type + " Account Number: " + accounts[i].account.account_number + " Funds Available To Trade: " + accounts[i].holdings[0].holding.shares,
        value: accounts[i].account.account_type + " Account Number: " + accounts[i].account.account_number + " Funds Available To Trade: " + accounts[i].holdings[0].holding.shares
      })
    }
    this.setState({
      accountOptions: accountOptions,
      accounts: accounts
    })
    console.log(accounts)
  }

  formatInvestmentsToOptions = () => {
    let investmentOptions = []
    let accounts = this.state.accounts
    let currentAccount = this.state.selectedAccountNumber
    for(let i = 0; i < accounts.length; i++){
      if(accounts[i].account.account_number === currentAccount){
        for(let k = 0; k < accounts[i].holdings.length; k++){
          investmentOptions.push({
            key: accounts[i].holdings[k].holding.symbol + " Current Shares: " + accounts[i].holdings[k].holding.shares,
            text: accounts[i].holdings[k].holding.symbol + " Current Shares: " + accounts[i].holdings[k].holding.shares,
            value: accounts[i].holdings[k].holding.symbol + " Current Shares: " + accounts[i].holdings[k].holding.shares
          })
        }
      }
    }
    this.setState({
      investmentOptions: investmentOptions
    })
  }

  handleTransactionSelect = (event) => {
    this.setState({
        transaction: event.target.innerText
    })
    if(event.target.innerText === "SELL"){
      this.formatInvestmentsToOptions()
    }
  }

  handleInvestmentSelect = (event) => {
    this.setState({
        investment: event.target.innerText
    })
  }

  handleCurrentInvestmentSelect = (event) => {
    let investment = event.target.innerText.split(" ")[0]
    let shares = event.target.innerText.split(" ").pop()
    this.setState({
        currentInvestment: investment,
        currentShares: shares
    })
  }



  handleAmount = (event) => {
    this.setState({
        amount: event.target.value
    })
  }

  handleAccountSelect = (event) => {
    let fundsAvailable = parseInt(event.target.innerText.split(" ").pop())
    let accountNumber = parseInt(event.target.innerText.split(" ")[3])
    this.setState({
        account: event.target.innerText,
        fundsAvailable: fundsAvailable,
        selectedAccountNumber: accountNumber
    })
  }

  handlePriceCheck = (event) => {
    event.preventDefault()
    this.setState({
      checkedPrice: true
    })
    let investment = ""
    if(this.state.transaction === "BUY"){
      investment = this.state.investment
    } else {
      investment = this.state.currentInvestment
    }
    fetchAlphaVantage(investment)
    .then( jsonObject => this.calculateValue(jsonObject))
  }

  calculateValue = (jsonObject) => {
    let keysArray = Object.keys(jsonObject["Time Series (1min)"])
    let firstKey = keysArray.shift()
    let secondKeysArray = Object.keys(jsonObject["Time Series (1min)"][firstKey])
    let secondKey = secondKeysArray.filter((key) => key.includes("open"))
    let sharePrice = jsonObject["Time Series (1min)"][firstKey][secondKey]
    let estimate = this.state.shares * sharePrice
    let resultingBalance
    let resultingShares = 0
    if(this.state.transaction === "BUY"){
      resultingBalance = this.state.fundsAvailable - estimate
    } else {
      resultingBalance = this.state.fundsAvailable + estimate
      resultingShares = this.state.currentShares - this.state.shares
    }
    this.setState({
      estimate: estimate,
      resultingBalance: resultingBalance,
      resultingShares: resultingShares
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let investment
    if(this.state.transaction === "BUY"){
      investment = this.state.investment
    } else {
      investment = this.state.currentInvestment
    }
    let transactionRequest = {
      account: this.state.account,
      transaction: this.state.transaction,
      investment: investment,
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

  renderBuy = () => {
    if(this.state.checkedPrice === true && this.state.transaction === "BUY" && this.state.resultingBalance < 0){
      return(
        <div className="estimate">
          <Statistic value={`$${this.state.estimate.toLocaleString()}`} label="Estimated Value" />
          <Statistic value={`$${this.state.resultingBalance.toLocaleString()}`} label="Estimated Resulting Cash Balance" />
          <div> not enough cash </div>
        </div>
        )
      } else if(this.state.checkedPrice === true && this.state.transaction === "BUY" && this.state.resultingBalance > 0) {
      return(
        <div className="estimate">
          <Statistic value={`$${this.state.estimate.toLocaleString()}`} label="Estimated Value" />
          <Statistic value={`$${this.state.resultingBalance.toLocaleString()}`} label="Estimated Resulting Cash Balance" />
          <Button size="large" positive onClick={this.handleSubmit}> Submit Trade </Button>
        </div>
        )
     }
   }

   renderSell = () => {
     if(this.state.checkedPrice === true && this.state.transaction === "SELL" && this.state.resultingShares < 0){
       return(
       <div className="estimate">
         <Statistic value={`$${this.state.estimate.toLocaleString()}`} label="Estimated Value" />
         <Statistic value={`$${this.state.resultingBalance.toLocaleString()}`} label="Estimated Resulting Cash Balance" />
         <div> Not enough shares to cover the trade! </div>
       </div>
       )
     } else if(this.state.checkedPrice === true && this.state.transaction === "SELL" && this.state.resultingShares > 0){
       return(
       <div className="estimate">
         <Statistic value={`$${this.state.estimate.toLocaleString()}`} label="Estimated Value" />
         <Statistic value={`$${this.state.resultingBalance.toLocaleString()}`} label="Estimated Resulting Cash Balance" />
         <Button size="large" positive onClick={this.handleSubmit}> Submit Trade </Button>
       </div>
       )
     }
   }


  render() {
    const { value } = this.state
    const options = this.state.accountOptions
    const investmentOptions = this.state.investmentOptions
    const transactionType =  [
      { key: 'BUY', text: 'BUY', value: 'BUY' },
      { key: 'SELL', text: 'SELL', value: 'SELL' },
    ]
    const investmentsConst = [
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
            {this.state.transaction === "BUY" ?
            <Form.Select label='Select Investment' options={investmentsConst} placeholder='Select Investment' onChange={this.handleInvestmentSelect} />
            :
            <Form.Select label='Select Investment' options={investmentOptions} placeholder='Select Investment' onChange={this.handleCurrentInvestmentSelect} />
             }
            <Form.Input label='Shares'onChange={this.handleShares}  />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Form.Button> Estimate Transaction Total </Form.Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
        <Grid centered columns={2}>


        <Grid.Column textAlign="center" verticalAlign="center">
          {this.state.transaction === "BUY" ?
           this.renderBuy()
           :
           this.renderSell()
           }
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
