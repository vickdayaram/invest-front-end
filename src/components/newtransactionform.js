import React, { Component } from 'react'
import { Form, Grid, Button, Statistic, Image, Table, Modal, Loader, Message } from 'semantic-ui-react'
import { Redirect } from 'react-router'
import { getAccounts } from '../apiAdapter'
import { sendTransaction } from '../apiAdapter'
import { fetchAlphaVantage } from '../apiAdapter'

class NewTransactionForm extends Component {

  state = {
    accounts: [],
    accountOptions: [],
    account: "",
    account_id: 0,
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
    investmentOptions: [],
    openModal: false,
    errors: false
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
        key: accounts[i].account.account_type + " Account Number: " + accounts[i].account.account_number + "-" + accounts[i].account.id + " Funds Available To Trade: " + accounts[i].holdings[0].holding.shares,
        text: accounts[i].account.account_type + " Account Number: " + accounts[i].account.account_number + "-" + accounts[i].account.id + " Funds Available To Trade: " + accounts[i].holdings[0].holding.shares,
        value: accounts[i].account.account_type + " Account Number: " + accounts[i].account.account_number + "-" + accounts[i].account.id + " Funds Available To Trade: " + accounts[i].holdings[0].holding.shares
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
          if(accounts[i].holdings[k].holding.symbol != "MM"){
            investmentOptions.push({
              key: accounts[i].holdings[k].holding.symbol + " Current Shares: " + accounts[i].holdings[k].holding.shares,
              text: accounts[i].holdings[k].holding.symbol + " Current Shares: " + accounts[i].holdings[k].holding.shares,
              value: accounts[i].holdings[k].holding.symbol + " Current Shares: " + accounts[i].holdings[k].holding.shares
            })
          }
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
        investment: event.target.innerText,
        errors: false
    })
  }

  handleCurrentInvestmentSelect = (event) => {
    let investment = event.target.innerText.split(" ")[0]
    let shares = event.target.innerText.split(" ").pop()
    this.setState({
        currentInvestment: investment,
        currentShares: shares,
        errors: false
    })
  }



  handleAmount = (event) => {
    this.setState({
        amount: event.target.value,
        errors: false
    })
  }

  handleAccountSelect = (event) => {
    let fundsAvailable = parseInt(event.target.innerText.split(" ").pop())
    let accountNumber = parseInt(event.target.innerText.split(" ")[3])
    let account_id = parseInt(event.target.innerText.split(" ")[3].split("-").pop())
    this.setState({
        account: event.target.innerText,
        fundsAvailable: fundsAvailable,
        selectedAccountNumber: accountNumber,
        account_id: account_id,
        errors: false
    })
  }

  checkForErrors = () => {
    let id = this.state.account_id
    let transaction = this.state.transaction
    let investment = this.state.investment
    let shares = this.state.shares
    if(id === 0){
      return true
    } else if(transaction === 0){
      return true
    } else if(investment === 0){
      return true
    } else if(!(parseInt(shares) > 0)){
      return true
    } else {
      return false
    }
  }

  renderErrors = () => {
    return (
          <Message negative><Message.Header><div className="center"> {"Please Make Sure to select all fields. Also make sure to enter a positive number for shares"} </div></Message.Header></Message>
    )
  }

  handlePriceCheck = (event) => {
    event.preventDefault()
    let error = this.checkForErrors()
    if(error){
      this.setState({
        errors: true
      })
      return
    }
    this.setState({
      checkedPrice: true,
      estimate: 0,
      resultingBalance: 0,
      resultingShares: 0
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
      resultingShares: resultingShares,
      errors: false
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
      account_id: this.state.account_id,
      transaction: this.state.transaction,
      investment: investment,
      shares: this.state.shares
    }
    sendTransaction(transactionRequest)
    .then(() => this.displayModal())
  }

  redirectToHome = () => {
    this.setState({
      status: true
    })
  }

  displayModal = () => {
    this.setState({
      openModal: true
    })
  }

  handleShares = (event) => {
    this.setState({
      shares: event.target.value,
      errors: false
    })
  }

  renderImage = () => {
    return(
      <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
    )
  }

  whatShouldWeDisplay = () => {
    if(this.state.transaction === "BUY"){
    if(this.state.checkedPrice === true && this.state.resultingBalance < 0){
      return(
        "Not Enough Cash"
        )
      } else if(this.state.checkedPrice === true && this.state.resultingBalance > 0) {
      return(
        "Display Button"
        )
     }
   } else {
     if(this.state.checkedPrice === true && this.state.resultingShares < 0){
       return(
       "Not Enough Shares"
       )
     } else if(this.state.checkedPrice === true && this.state.resultingShares > 0){
       return(
       "Display Button"
       )
     }
   }
  }


  renderTable = (renderFunction) => {
    let message = ""
    let whatShouldWeDisplay = this.whatShouldWeDisplay()
    if(whatShouldWeDisplay === "Not Enough Cash"){
      message = "Not Enough Cash"
    } else if(whatShouldWeDisplay === "Not Enough Shares"){
      message = "Not Enough Shares"
    } else {
      message = "Display Button"
    }
    return (
      <div className="estimate">
        <Table celled size="large" textAlign="center">
        <Table.Header>
           <Table.Row>
             <Table.HeaderCell>Details</Table.HeaderCell>
             <Table.HeaderCell>Values</Table.HeaderCell>
           </Table.Row>
        </Table.Header>

       <Table.Body>
       <Table.Row>
         <Table.Cell> Estimated Trade </Table.Cell>
         {this.state.estimate > 0 ?
           <Table.Cell> <Statistic value={`$${this.state.estimate.toLocaleString()}`} label="Estimated Value" /></Table.Cell>
           :
           <Table.Cell> <div className="transactionLoader"> < Loader size="massive" active inline="centered" /></div></Table.Cell>
         }
       </Table.Row>
       <Table.Row>
          <Table.Cell> Estimated Cash Value </Table.Cell>
          {this.state.resultingBalance > 0 || this.state.resultingBalance < 0 ?
            <Table.Cell> <Statistic value={`$${this.state.resultingBalance.toLocaleString()}`} label="Estimated Resulting Cash Balance" /></Table.Cell>
            :
            <Table.Cell> <div className="transactionLoader"> < Loader size="massive" active inline="centered" /></div></Table.Cell>
          }
       </Table.Row>
       <Table.Row>
          {message === "Display Button" && this.state.estimate > 0 ?
          <Table.Cell colSpan={2}> <Button size="large" positive onClick={this.handleSubmit}> Submit Trade </Button> </Table.Cell>
          :
          null
          }
          {message === "Not Enough Cash" || message === "Not Enough Shares" ?
          <Table.Cell colSpan={2}> <div> {message} </div> </Table.Cell>
          :
          null
          }
       </Table.Row>
       </Table.Body>
       </Table>
      </div>
    )
  }

  renderModal = () => {
    return (
      <Modal size="small" open={this.state.openModal} onClose={this.close}>
          <Modal.Header>
          <div className="center"> Transaction Submitted </div>
          </Modal.Header>
          <Modal.Content>
            <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="medium" centered={true}/>
          </Modal.Content>
          <Modal.Actions>
            <div className="center"><Button positive fluid={true} icon='checkmark' labelPosition='center' content='Home' onClick={this.redirectToHome}/> </div>
          </Modal.Actions>
      </Modal>
    )
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
      {this.renderModal()}
      <Grid centered columns={2}>
      <Grid.Row>
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
            <Form.Button primary={true} fluid={true} color="green"> Estimate Transaction Total </Form.Button>
          </Form>
        </Grid.Column>
        <Grid.Column>

        <Grid.Column textAlign="center" verticalAlign="center">
           {this.state.checkedPrice === false ?
           this.renderImage()
           :
           this.renderTable()
           }
        </Grid.Column>



        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column>
          {this.state.errors ?
          this.renderErrors()
          :
          null}
        </Grid.Column>
        </Grid.Row>
      </Grid>
      {this.state.status ? < Redirect to="/home" /> : null}
      </div>

    )
  }
}

export default NewTransactionForm
