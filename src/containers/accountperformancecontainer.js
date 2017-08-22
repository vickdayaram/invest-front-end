import React from 'react'
import PerformanceDisplay from '../components/performancedisplay'
import { getAccounts } from '../apiAdapter'

class AccountPerformanceContainer extends React.Component {


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
        <div className="balancesText"> Account Performance </div>
        {this.state.accounts.accounts ?
        this.state.accounts.accounts.map((account) =>{
          return < PerformanceDisplay account={account} />})
        : <div> Loading </div>}
      </div>
    )
  }
}

export default AccountPerformanceContainer
