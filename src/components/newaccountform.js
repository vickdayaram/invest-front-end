import React, { Component } from 'react'
import { Form, Grid, Image, Modal, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router'
import { sendNewAccount } from '../apiAdapter'


const options = [
  { key: 'IRA', text: 'IRA', value: 'IRA' },
  { key: 'Individual', text: 'Individual', value: 'Individual' },
]

class NewAccountForm extends Component {
  state = {
    bankname: "",
    deposit: "",
    type: "",
    status: false,
    openModal: false
  }

  handleBankName = (event) => {
    this.setState({
      bankname: event.target.value
    })
  }

  handleDeposit = (event) => {
    this.setState({
      deposit: event.target.value
    })
  }

  handleAccountType = (event) => {
    this.setState({
      type: event.target.innerText
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    sendNewAccount(this.state)
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

  render() {
    const { value } = this.state
    return (
      <div className="accountscontainer">
      {this.renderModal()}
      <Grid centered columns={2}>
        <Grid.Column>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label='Where the money is coming from?' placeholder='Bank Name' onChange={this.handleBankName} />
            <Form.Input label='Initial Deposit' placeholder='$' onChange={this.handleDeposit}  />
            <Form.Select label='Account Type' options={options} placeholder='Account Type' onChange={this.handleAccountType} />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Form.Button primary={true} fluid={true}>Submit</Form.Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
        </Grid.Column>
      </Grid>
      {this.state.status ? < Redirect to="/home" /> : null}
      </div>

    )
  }
}

export default NewAccountForm
