import React from 'react'
import AccountBody from '../components/accountbody'
import AccountDisplay from '../components/accountdisplay'

const baseUrl = 'http://localhost:3000/api/v1'

class Accounts extends React.Component {

  state = {
    accounts: {}
  }

  componentDidMount = () => {
    fetch(`${baseUrl}/getaccounts`, {
      method: 'GET',
      headers: this.headers(),
    }).then(res => res.json())
    .then((jsonObject) => this.setState({
      accounts: jsonObject
    }))
    .then(() => console.log(this.state.accounts.accounts))
  }

  headers () {
    return {
      'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    }
  }

  render(){
    return (
      <div>
        Accounts container
        < AccountDisplay current_user={this.state.accounts}/>
        {this.state.accounts.accounts ?
        this.state.accounts.accounts.map((account) =>{
          return < AccountBody account={account}/>})
        : null}
      </div>
    )
  }
}

export default Accounts
