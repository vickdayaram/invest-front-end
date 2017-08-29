import React from 'react'
import Holding from './holding'
import { Menu, Segment, Table } from 'semantic-ui-react'
import formatCurrency from 'format-currency'


class AccountBody extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      holdings: [],
      accountBalance: 0
    }
  }

  calculateTotal = (balance) => {
    let addingBalance = this.state.accountBalance + parseFloat(balance)
    this.setState({
      accountBalance: addingBalance
    })
  }

  render(){
    const account_type = this.props.account.account.account_type
    const account_number = this.props.account.account.account_number
    const account_id = this.props.account.account.id
    let options = { format: '%s%v', symbol: '$' }
    return(
      <div className="accountdisplay">
        <Segment attached='bottom'>
        <Table celled>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell
          className="accountHeader"
          colSpan="4"
          textAlign="right"
          > {account_type + "   Account Number: " + account_number + "-" + account_id}
          </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Symbol</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Shares</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {this.props.account.holdings.map((holding) => {
          return < Holding holding={holding} calculateTotal={this.calculateTotal} />
        })}
          <Table.Row>
            <Table.Cell active={true}> </Table.Cell>
            <Table.Cell active={true}> </Table.Cell>
            <Table.Cell textAlign="center" active={true}> Account Balance </Table.Cell>
            <Table.Cell textAlign="center" active={true}>{formatCurrency(this.state.accountBalance, options)} </Table.Cell>
          </Table.Row>
        </Table>
        </Segment>
      </div>
    )
  }
}

export default AccountBody
