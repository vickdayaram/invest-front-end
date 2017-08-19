import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import { Doughnut } from 'react-chartjs-2'


const conservative =  {
            labels: ["VTI", "VXUS", "BND", "BNDX"],
            datasets: [{
            label: "Conservative Allocation",
            backgroundColor: ["#C61919", "#C61919", "#202759", "#202759"],
            borderColor: 'rgb(255, 99, 132)',
            data: [24, 16, 42, 18]
        }]
    }
const moderate =  {
            labels: ["VTI", "VXUS", "BND", "BNDX"],
            datasets: [{
            label: "Moderate Allocation",
            backgroundColor: ["#C61919", "#C61919", "#202759", "#202759"],
            borderColor: 'rgb(255, 99, 132)',
            data: [30, 20, 35, 15]
        }]
    }
const aggressive =  {
            labels: ["VTI", "VXUS", "BND", "BNDX"],
            datasets: [{
            label: "Aggressive Allocation",
            backgroundColor: ["#C61919", "#C61919", "#202759", "#202759"],
            borderColor: 'rgb(255, 99, 132)',
            data: [36, 24, 28, 12]
        }]
    }

const chartOptions = {
      maintainAspectRatio: false,
      title:{
        display: false,
        text: "Recommended Allocation",
        fontSize: 25,
        position: "top",
        fontColor: "black"
      },
      legend:{
        display: true,
        position: "bottom",
        fullWidth: false,
        boxWidth: 15
      },
      cutoutPercentage: 0,
      label: {
        display: true
      }
    }

const displayAggressive = () => {
  return(
    <div className="recommendation">
      <div className="recommendationText"> Recommended Allocation: Aggressive </div>
      <Doughnut data={aggressive} options={chartOptions} height={200} width={200}/>
    </div>
  )
}
const displayModerate = () => {
  return(
    <div className="recommendation">
      <div className="recommendationText"> Recommended Allocation: Moderate </div>
      <Doughnut data={moderate} options={chartOptions} height={200} width={200}/>
    </div>
  )
}
const displayConservative = () => {
  return(
    <div className="recommendation">
      <div className="recommendationText"> Recommended Allocation: Conservative </div>
      <Doughnut data={conservative} options={chartOptions} height={200} width={200}/>
    </div>
  )
}

class RecommendationModal extends Component {

  state = {
    open: true,
    redirect: false
  }

  handleClose = () => {
    this.props.closeModal()
  }

  handleImplement = () => {
    this.props.implement()
  }

  handleDisplay = () => {
    let riskTolerance = this.props.riskTolerance
    if(riskTolerance === "Conservative"){
      return displayConservative()
    } else if (riskTolerance === "Moderate"){
      return displayModerate()
    } else if (riskTolerance === "Aggressive"){
      return displayAggressive()
    }
  }

  render(){
  return (
  <Modal open={this.props.open}>
    <Modal.Header>Profile Picture</Modal.Header>
    <Modal.Content image scrolling>
      {this.handleDisplay()}

      <Modal.Description>
        <Header>Modal Header</Header>
        <p>This is an example of expanded content that will cause the modals dimmer to scroll</p>

      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary onClick={this.handleClose}>
        Back to Questionaire <Icon name='right chevron' />
      </Button>
      <Button primary onClick={this.handleImplement}>
        Proceed to Implement <Icon name='right chevron' />
      </Button>
    </Modal.Actions>
  </Modal>
)
}
}

export default RecommendationModal
