import React from 'react'
import { getAccounts } from '../apiAdapter'
import PerformanceData from '../components/performancedata'

class PerformanceContainer extends React.Component {


  state = {

    }


  render(){
    return (
      <div className="accountscontainer">
        < PerformanceData />
      </div>
    )
  }
}

export default PerformanceContainer
