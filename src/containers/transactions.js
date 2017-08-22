import React from 'react'
import { getTransactions } from '../apiAdapter'
import { Form, Grid, Statistic, Image, Table } from 'semantic-ui-react'
import TransactionEntry from '../components/transactionentry'
import FuzzySearch from 'fuzzy-search'

class Transactions extends React.Component {

  state = {
    transactions: {},
    search: ""
  }

  componentDidMount = () => {
    getTransactions()
    .then((json) => this.structureData(json))
  }

  handleTransactionSearch = (event) => {
    let search = event.target.value
    let transactionData = this.state.transactionData
    let searcher = new FuzzySearch(transactionData, ['holding', 'price', 'shares', 'date', 'type'], {
    caseSensitive: false,
    });
    if(search.length > 0){
      let result = searcher.search(search)
      this.setState({
        search: search,
        filteredData: result
      })
    } else {
      this.setState({
        search: search,
        filteredData: transactionData
      })
    }
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
    let transactionData = this.state.allTransactions[accountSelect].reverse()
    this.setState({
      transactionData: transactionData,
      filteredData: transactionData
    })
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
            <Form.Select label='Account' options={accounts} placeholder='Select Account' onChange={this.handleAccountSelect} />
          </Form>
          </Grid.Column>
          <Grid.Column width={2}>
          </Grid.Column>
        </Grid.Row>
        </Grid>

        {this.state.transactionData ?
        <div className="transactionDisplay">
        <Form>
        <Form.Input placeholder="Search Transactions" onChange={this.handleTransactionSearch}/>
        </Form>
        <Table celled selectable>
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
        { this.state.filteredData.map((data) => {
          return < TransactionEntry data={data} />
        })}

        </Table>
        </div>
        :
        <div className="newusertransactiondisplay">
          <Image className="newusermessage" src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
        </div>
        }
      </div>
      </div>
    )
  }
}

export default Transactions
