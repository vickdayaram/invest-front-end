import React, { Component } from 'react'
import { Form, Grid, Image, Modal, Button, Message } from 'semantic-ui-react'
import { Redirect } from 'react-router'
import { sendNewAccount } from '../apiAdapter'


const options = [
  { key: 'Individual', text: 'Individual', value: 'Individual' }
]

class NewAccountForm extends Component {
  state = {
    bankname: "",
    deposit: "",
    type: "",
    status: false,
    openModal: false,
    errors: false,
    riskTolerance: ""
  }

  componentDidMount = () => {
    if(this.props.riskTolerance != undefined){
      this.setState({
        riskTolerance: this.props.riskTolerance
      })
    }
  }

  handleBankName = (event) => {
    this.setState({
      bankname: event.target.value,
      errors: false
    })
  }

  handleDeposit = (event) => {
    let deposit = event.target.value.split(",").join("")
    this.setState({
      deposit: deposit,
      errors: false
    })
  }

  handleAccountType = (event) => {
    this.setState({
      type: event.target.innerText,
      errors: false
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let errors = this.checkForErrors()
    if(errors){
      this.setState({
        errors: true
      })
      return
    }
    sendNewAccount(this.state)
    .then(() => this.displayModal())
  }

  checkForErrors = () => {
    let deposit = this.state.deposit
    let type = this.state.type
    let bankname = this.state.bankname
    if(!(parseInt(deposit) > 0)){
      return true
    } else if(type.length === 0){
      return true
    } else if(bankname.length === 0){
      return true
    } else {
      return false
    }
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

  renderModal = () => {
    return (
      <Modal size="small" open={this.state.openModal} onClose={this.close}>
          <Modal.Header>
          <div className="center">  Account Successfully opened </div>
          </Modal.Header>
          <Modal.Content>
            <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="medium" centered={true}/>
          </Modal.Content>
          <Modal.Actions >
          <div className="center"> <Button positive fluid={true }icon='checkmark' labelPosition='center' content='Back to Home' onClick={this.redirectToHome}/> </div>
          </Modal.Actions>
      </Modal>
     )
  }

  renderErrors = () => {
    return (
          <Message negative><Message.Header><div className="center"> {"Please Make Sure to fill out all fields. Also make sure to enter a positive number for your deposit"} </div></Message.Header></Message>
    )
  }

  render() {
    const { value } = this.state
    return (
      <div className="accountscontainer">
      {this.renderModal()}
      <Grid centered columns={2}>
        <Grid.Row>
        <Grid.Column>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label='Where the money is coming from?' placeholder='Bank Name' onChange={this.handleBankName} />
            <Form.Input label='Initial Deposit' placeholder='$' onChange={this.handleDeposit}  />
            <Form.Select label='Account Type' options={options} placeholder='Account Type' onChange={this.handleAccountType} />
            <Form.Button primary={true} fluid={true}>Submit</Form.Button>
            {this.state.riskTolerance.length > 0 ?
            <Form.Button primary={true} fluid={true} onClick={this.props.cancel}> Back to Recommendation </Form.Button>
            : null
            }
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {this.state.errors ?
          this.renderErrors()
          :
          null}
        </Grid.Row>
      </Grid>
      {this.state.status ? < Redirect to="/balancesandholdings" /> : null}
      </div>

    )
  }
}

export default NewAccountForm
