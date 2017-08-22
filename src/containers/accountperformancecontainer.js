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

        {this.state.accounts.accounts && this.state.accounts.accounts.length === 0 ?
        <div>
          <div className="newusermessage">
          <p>You have not opened an account yet! </p>
          <p>You can open one by navigating with the links above! </p>
          </div>
          <Image className="newusermessage" src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
        </div>
        :
        null}

      </div>
    )
  }
}

export default AccountPerformanceContainer
