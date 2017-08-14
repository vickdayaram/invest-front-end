import React from 'react'
import AccountBody from '../components/accountbody'
import AccountDisplay from '../components/accountdisplay'
import { getAccounts } from '../apiAdapter'

class Accounts extends React.Component {


  state = {
      accounts: {}
    }


  componentDidMount = () => {
    getAccounts()
    .then((jsonObject) => this.setState({
      accounts: jsonObject
    }))
  }

  render(){
    return (
      <div className="accountscontainer">
        <div className="balancesText"> Balances and Holdings </div>
        {this.state.accounts.accounts ?
        this.state.accounts.accounts.map((account) =>{
          return < AccountBody account={account} />})
        : <div> Loading </div>}
      </div>
    )
  }
}

export default Accounts
