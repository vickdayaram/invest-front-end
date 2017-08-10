import React from 'react'
import {Link, Redirect} from 'react-router-dom'


class Landing extends React.Component {

  state = {
  }

  render(){
  return(

    <div>
        Landing
        < Link to="/signup" > SignUp </Link>
        < Link to="/login" > Login </Link>
    </div>
  )
 }
}

export default Landing
