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

          <Grid.Row textAlign="center">
            <Grid.Column >
            <div className="landingHeader"> Investment Tracker </div>
            <div className="landingBody"> Track your investments, and view market data. </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row textAlign="center">
            <Grid.Column >
            <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row >
            <Grid.Column textAlign="center" >
                <div className="login">
                 <Button.Group size="massive">
                  <Link to="/signup"> <Button color="grey" size="massive"> Sign Up </Button> </Link>
                  <Button.Or />
                  <Link to="/login"> <Button positive color="grey" size="massive"> Login </Button> </Link>
                 </Button.Group>
                </div>
              </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" >

            </Grid.Column>
          </Grid.Row>
      </Grid>
    </div>

  )
 }
}

export default Landing
