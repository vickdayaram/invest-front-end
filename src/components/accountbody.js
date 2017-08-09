import React from 'react'
import Holding from './holding'

const baseUrl = 'http://localhost:3000/api/v1'

class AccountBody extends React.Component {

  state = {
    holdings: []
  }

  render(){
    return(
      <div>
        {this.props.account.account.account_type}
        {this.props.account.holdings.map((holding) => {
          return < Holding holding={holding} />
        })}
      </div>
    )
  }
}

export default AccountBody
