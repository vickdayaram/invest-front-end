import React from 'react'
import AccountBody from '../components/accountbody'
import { getAccounts } from '../apiAdapter'
import { Loader, Image } from 'semantic-ui-react'

class Accounts extends React.Component {


  state = {
      accounts: {}
    }


  componentDidMount = () => {
    getAccounts()
    .then((jsonObject) => {
      this.setState({
      accounts: jsonObject
    })
      console.log(this.state.accounts)})
  }

  render(){
    return (
      <div className="accountscontainer">
        <div className="balancesText"> Balances and Holdings </div>
        {this.state.accounts.accounts ?
        this.state.accounts.accounts.map((account) =>{
          return < AccountBody account={account} />})
        : <div className="welcomeLoader"> < Loader size="massive" active inline="centered" /> </div>}
      </div>
    )
  }
}

export default Accounts
