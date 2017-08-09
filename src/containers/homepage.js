import React from 'react'
import Welcome from '../components/welcome'
import Accounts from './accounts'

class HomePage extends React.Component {

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

export default HomePage
