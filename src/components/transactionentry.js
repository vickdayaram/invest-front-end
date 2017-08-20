import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import formatCurrency from 'format-currency'
import NumberFormat from 'react-number-format'


class TransactionEntry extends React.Component {

  render(){
    let options = { format: '%s%v', symbol: '$' }
    return(

        <Table.Row>
          <Table.Cell textAlign="center"> {this.props.data.holding} </Table.Cell>
          <Table.Cell textAlign="center"> {this.props.data.type} </Table.Cell>
          <Table.Cell textAlign="center"> {formatCurrency(this.props.data.price, options)} </Table.Cell>
          <Table.Cell textAlign="center"> <NumberFormat value={this.props.data.shares} displayType={'text'} thousandSeparator={true} decimalPrecision={2} /></Table.Cell>
          <Table.Cell textAlign="center"> {this.props.data.date} </Table.Cell>
        </Table.Row>

    )
  }
}

export default TransactionEntry
