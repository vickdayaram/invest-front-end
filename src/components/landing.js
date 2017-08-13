import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Grid, Image } from 'semantic-ui-react'


class Landing extends React.Component {

  state = {
  }

  render(){
  return(

    <div className="background">
      <Grid>
        <Grid.Row columns={3}>

            <Grid.Column textAlign="center" width={8}>
              <div className="login">
               <Button.Group size="massive">
                <Link to="/signup"> <Button color="grey" size="massive"> Sign Up </Button> </Link>
                <Button.Or />
                <Link to="/login"> <Button positive color="grey" size="massive"> Login </Button> </Link>
               </Button.Group>
              </div>
            </Grid.Column>

            <Grid.Column width={8} >
            <Image src="https://image.freepik.com/free-icon/piggy-bank-with-dollar-coin_318-37770.jpg" size="large" floated="right" />
            </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>

  )
 }
}

export default Landing
