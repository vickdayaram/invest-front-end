import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import formatCurrency from 'format-currency'


class TransactionEntry extends React.Component {

  render(){
    let options = { format: '%s%v', symbol: '$' }
    return(

        <Table.Row>
          <Table.Cell textAlign="center"> {this.props.data.holding} </Table.Cell>
          {this.props.data.buy === true ?
          <Table.Cell textAlign="center"> Buy </Table.Cell>
          :
          <Table.Cell textAlign="center"> Sell </Table.Cell>
          }
          <Table.Cell textAlign="center"> {formatCurrency(this.props.data.price, options)} </Table.Cell>
          <Table.Cell textAlign="center"> {parseFloat(this.props.data.shares).toLocaleString()} </Table.Cell>
          <Table.Cell textAlign="center"> {this.props.data.date} </Table.Cell>
        </Table.Row>

    )
  }
}

export default TransactionEntry
