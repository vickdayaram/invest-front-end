import React, { Component } from 'react'
import { Grid, Button, Form, Segment, Divider } from 'semantic-ui-react'

class SignUpForm extends Component {

  state = {
    username: "",
    password: ""
  }

  handleUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSignUp(this.state)
  }


  render () {
    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Username</label>
              <input name='username' placeholder='Username' onChange={this.handleUsername} value={this.state.username}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type='password' name='password' placeholder='Password' onChange={this.handlePassword} value={this.state.password}/>
            </Form.Field> 
              <Button size='huge' type='submit'>Sign Up</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SignUpForm
