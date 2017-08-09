import React from 'react'
import Welcome from '../components/welcome'
import Accounts from './accounts'
import NewAccountForm from '../components/newaccountform'
import { Route } from 'react-router-dom'

class AppContainer extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        HomePage Container
        < Welcome />
        < Accounts />
      </div>
    )
  }
}

export default AppContainer
