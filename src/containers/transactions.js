import React from 'react'
import { getTransactions } from '../apiAdapter'

class Transactions extends React.Component {

  state = {}

  componentDidMount = () => {
    getTransactions()
    .then((json) => console.log(json))
  }

  render(){
    return(
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        in transactions
      </div>
    )
  }
}

export default Transactions
