import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'
import { stockData } from '../stockData'
import _ from 'lodash'

class TransactionSearch extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    let symbol = result.title
    this.setState({ value: result.title })
    this.props.handleSymbolSelect(symbol)
    console.log(result.title)
  }

  handleSearchChange = (e, { value }) => {
   this.setState({ isLoading: true, value })

   setTimeout(() => {
     if (this.state.value.length < 1) return this.resetComponent()

     const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
     const isMatch = (result) => re.test(result.description)

     this.setState({
       isLoading: false,
       results: _.filter(stockData, isMatch),
     })
   }, 500)
 }

  render() {
    const { isLoading, value, results } = this.state

    return (
          <div className="searchBar">
          <Search
            className="transactionSearchBar"
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            fluid={true}
            size="small"
            placeholder="Search by Company"
            {...this.props}
          />
          </div>
    )
  }
}

export default TransactionSearch
