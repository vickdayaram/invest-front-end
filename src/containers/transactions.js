import React from 'react'
import { getTransactions } from '../apiAdapter'
import { Form, Grid, Statistic, Image, Table } from 'semantic-ui-react'
import TransactionEntry from '../components/transactionentry'

class Transactions extends React.Component {

  state = {
    transactions: {}
  }

  componentDidMount = () => {
    getTransactions()
    .then((json) => this.structureData(json))
  }

  structureData = (json) => {
    let options = Object.keys(json)
    let format = []
    for(let i = 0; i < options.length; i++){
      format.push({key: options[i], text: options[i], value: options[i]})
    }
    this.setState({
      accountOptions: format,
      allTransactions: json
    })
  }

  handleAccountSelect = (event) => {
    let accountSelect = event.target.innerText
    let transactionData = this.state.allTransactions[accountSelect]
    this.setState({
      transactionData: transactionData
    })
    console.log(transactionData)
  }

  render(){
    const accounts = this.state.accountOptions
    return(
      <div className="performanceSearch">
        <div className="accountDisplay">
        <Grid centered columns={3}>
        <Grid.Row>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={12}>
          <Form >
            <Form.Select label='Symbol' options={accounts} placeholder='Symbol Select' onChange={this.handleAccountSelect} />
          </Form>
          </Grid.Column>
          <Grid.Column width={2}>
          </Grid.Column>
        </Grid.Row>
        </Grid>

        {this.state.transactionData ?
        <div className="transactionDisplay">
        <Table celled>
        <Table.Header >
          <Table.Row>
          <Table.HeaderCell
          className="accountHeader"
          colSpan="5"
          textAlign="center"
          > Transactions
          </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign="center"> Symbol </Table.HeaderCell>
            <Table.HeaderCell textAlign="center"> Transaction </Table.HeaderCell>
            <Table.HeaderCell textAlign="center"> Share Price </Table.HeaderCell>
            <Table.HeaderCell textAlign="center"> Shares </Table.HeaderCell>
            <Table.HeaderCell textAlign="center"> Date </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {this.state.transactionData.map((data) => {
          return < TransactionEntry data={data} />
        })}

        </Table>
        </div>
        :
        null
        }
      </div>
      </div>
    )
  }
}

export default Transactions
