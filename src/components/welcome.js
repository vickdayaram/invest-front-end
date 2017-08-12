import React from 'react'

class Welcome extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="welcome">
        Welcome {this.props.current_user}, and some market information
      </div>
    )
  }
}

export default Welcome
