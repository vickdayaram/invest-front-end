import React from 'react'
import PerformanceDisplay from '../components/performancedisplay'
import { getAccountPerformance } from '../apiAdapter'
import { Loader, Image } from 'semantic-ui-react'

class AccountPerformanceContainer extends React.Component {


  state = {
      accounts: {}
    }


  componentDidMount = () => {
    getAccountPerformance()
    .then((jsonObject) => {
      this.setState({
      accounts: jsonObject
    })
   })
  }

  render(){
    return (
      <div className="accountscontainer">
        <div className="balancesText"> Account Performance </div>
        {this.state.accounts.accounts ?
        this.state.accounts.accounts.map((account) =>{
          return < PerformanceDisplay account={account} />})
        : <div className="welcomeLoader"> < Loader size="massive" active inline="centered" /> </div>}
      </div>
    )
  }
}

export default AccountPerformanceContainer
