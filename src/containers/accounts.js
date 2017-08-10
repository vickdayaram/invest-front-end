import React from 'react'
import AccountBody from '../components/accountbody'
import AccountDisplay from '../components/accountdisplay'


const baseUrl = 'http://localhost:3000/api/v1'

class Accounts extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      accounts: {}
    }
  }
  
  componentDidMount = () => {
    fetch(`${baseUrl}/getaccounts`, {
      method: 'GET',
      headers: this.headers(),
    }).then(res => res.json())
    .then((jsonObject) => this.setState({
      accounts: jsonObject
    }))
    .then(() => this.setUser())
  }

  setUser = () => {
    this.props.setCurrentUser(this.state.accounts.username)
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
      <div className="accountscontainer">
        Accounts container
        < AccountDisplay current_user={this.state.accounts.username}/>
        {this.state.accounts.accounts ?
        this.state.accounts.accounts.map((account) =>{
          return < AccountBody account={account}/>})
        : null}
      </div>
    )
  }
}

export default Accounts
