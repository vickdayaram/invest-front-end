import React, { Component } from 'react'
import { Grid, Button, Form, Segment, Divider } from 'semantic-ui-react'

class SignUpForm extends Component {

  constructor (props) {
    super(props)
  }


  render () {
    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Form >
            <Form.Field>
              <label>Username</label>
              <input name='username' placeholder='Username' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type='password' name='password' placeholder='Password'/>
            </Form.Field>
            <Button size='huge' type='submit'>Sign Up</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SignUpForm
