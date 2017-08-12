import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { Redirect } from 'react-router'
import { sendNewAccount } from '../apiAdapter'


const baseUrl = 'http://localhost:3000/api/v1'

const options = [
  { key: 'IRA', text: 'IRA', value: 'IRA' },
  { key: 'Individual', text: 'Individual', value: 'Individual' },
]

class NewAccountForm extends Component {
  state = {
    bankname: "",
    deposit: "",
    type: "",
    status: false
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
    .then(() => this.redirectToHome())
  }

  redirectToHome = () => {
    this.setState({
      status: true
    })
  }

  render() {
    const { value } = this.state
    return (
      <div>
      <Grid centered columns={3}>
        <Grid.Column>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label='Where the money is coming from?' placeholder='Bank Name' onChange={this.handleBankName} />
            <Form.Input label='Initial Deposit' placeholder='$' onChange={this.handleDeposit}  />
            <Form.Select label='Account Type' options={options} placeholder='Account Type' onChange={this.handleAccountType} />
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

export default NewAccountForm
