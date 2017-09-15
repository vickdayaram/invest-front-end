import React, { Component } from 'react'
import { Grid, Button, Form, Image, Message } from 'semantic-ui-react'

class SignUpForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
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

  renderErrors = () => {
    return (
      this.props.errors.map((error) => {
        return (
          <Message negative><Message.Header><div className="center"> {error} </div></Message.Header></Message>
        )
      })
    )
  }


  render () {
    return (
      <div className="signupandlogin">
        <Grid centered columns={3}>
          <Grid.Row>
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
                <Button fluid={true} size='huge' type='submit' primary={true} color="green">Sign Up</Button>
            </Form>
            <Message><Message.Header><div> As a new User you will start with a $10,000 Investment Tracker Cash Balance! </div></Message.Header></Message>
            </Grid.Column>
            <Grid.Column textAlign="center">
            <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column stretched={true}>
              {this.props.errors.length ?
              this.renderErrors()
              :
              null}
              </Grid.Column>
            </Grid.Row>
        </Grid>
      </div>
    )
  }
}



export default SignUpForm
