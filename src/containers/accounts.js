import React from 'react'
import Holdings from '../components/holdings'
import AccountDisplay from '../components/accountdisplay'

class Accounts extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        Accounts container
        < Holdings />
        < AccountDisplay />
      </div>
    )
  }
}

export default Accounts
