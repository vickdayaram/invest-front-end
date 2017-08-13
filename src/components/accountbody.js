import React from 'react'
import Holding from './holding'
import { Menu, Segment, Table } from 'semantic-ui-react'


class AccountBody extends React.Component {

  state = {
    holdings: [],
    accountBalance: 0
  }

  calculateTotal = (balance) => {
    let addingBalance = this.state.accountBalance + parseInt(balance)
    this.setState({
      accountBalance: addingBalance
    })
  }

  render(){
    const account_type = this.props.account.account.account_type
    const account_number = this.props.account.account.account_number
    return(
      <div className="accountdisplay">
        <Menu tabular>
        <Menu.Item name={account_type + "   Account Number: " + account_number} position="right" />
        </Menu>
        <Segment attached='bottom'>
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Symbol</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Shares</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {this.props.account.holdings.map((holding) => {
          return < Holding holding={holding} calculateTotal={this.calculateTotal} portfolioTotal={this.props.portfolioTotal} />
        })}
          <Table.Row>
            <Table.Cell active="true"> </Table.Cell>
            <Table.Cell active="true"> </Table.Cell>
            <Table.Cell textAlign="center" active="true"> Account Balance </Table.Cell>
            <Table.Cell textAlign="center" active="true"> $ {this.state.accountBalance.toLocaleString()} </Table.Cell>
          </Table.Row>
        </Table>
        </Segment>
      </div>
    )
  }
}

export default AccountBody
