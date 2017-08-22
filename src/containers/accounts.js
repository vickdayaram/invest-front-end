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

export default Accounts
