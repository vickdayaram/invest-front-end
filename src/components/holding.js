import React from 'react'

class Holding extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        name: {this.props.holding.holding.name}
        shares: {this.props.holding.holding.shares}
        symbol: {this.props.holding.holding.symbol}
      </div>
    )
  }
}

export default Holding
