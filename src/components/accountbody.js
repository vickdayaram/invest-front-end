import React from 'react'
import Holding from './holding'
import { Menu, Segment } from 'semantic-ui-react'

const baseUrl = 'http://localhost:3000/api/v1'

class AccountBody extends React.Component {

  state = {
    holdings: [],
    activeItem: this.props.account.account.account_type
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    const { activeItem } = this.state
    const account_type = this.props.account.account.account_type
    return(
      <div className="accountdisplay">
        <Menu tabular>
        <Menu.Item name={account_type} active={activeItem === account_type} onClick={this.handleItemClick} />
        <Menu.Item name='photos' active={activeItem === 'photos'} onClick={this.handleItemClick} />
        </Menu>
        <Segment attached='bottom'>
        {this.props.account.holdings.map((holding) => {
          return < Holding holding={holding} />
        })}
        </Segment>
      </div>
    )
  }
}

export default AccountBody
