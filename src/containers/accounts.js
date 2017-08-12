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
    .then(() => this.setUser())
  }

  setUser = () => {
    this.props.setCurrentUser(this.state.accounts.username)
  }

  render(){
    return (
      <div className="accountscontainer">
        < AccountDisplay current_user={this.state.accounts.username}/>
        {this.state.accounts.accounts ?
        this.state.accounts.accounts.map((account) =>{
          return < AccountBody account={account} portfolioTotal={this.props.portfolioTotal}/>})
        : <div> Loading </div>}
      </div>
    )
  }
}

export default Accounts
