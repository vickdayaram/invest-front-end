import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Grid } from 'semantic-ui-react'


class Landing extends React.Component {

  state = {
  }

  render(){
  return(

    <div className="background">
      <Grid>
        <Grid.Row columns={3}>
            <Grid.Column>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <div className="login">
               <Button.Group size="massive">
                <Link to="/signup"> <Button color="grey" size="massive"> Sign Up </Button> </Link>
                <Button.Or />
                <Link to="/login"> <Button positive color="grey" size="massive"> Login </Button> </Link>
               </Button.Group>
              </div>
            </Grid.Column>

            <Grid.Column>
            </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>

  )
 }
}

export default Landing
