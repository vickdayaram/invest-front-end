import React from 'react'
import Welcome from '../components/welcome'
import Accounts from './accounts'
import NewAccountForm from '../components/newaccountform'
import { Route } from 'react-router-dom'

class AppContainer extends React.Component {

  state = {
    current_user: ""
  }

  setCurrentUser = (current_user) => {
    this.setState({
      current_user: current_user
    })
  }

  render(){
    return (
      <div>
        < Welcome current_user={this.state.current_user}/>
        < Accounts setCurrentUser={this.setCurrentUser}/>
      </div>
    )
  }
}

export default AppContainer
