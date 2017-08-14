import React from 'react'

class Welcome extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="welcome">
        Welcome {this.props.current_user}, portfolioTotal: ${this.props.portfolioTotal.toLocaleString()}
      </div>
    )
  }
}

export default Welcome
