import React, { Component } from 'react'
import { Grid, Button, Form, Segment, Divider, Image } from 'semantic-ui-react'
import { Doughnut } from 'react-chartjs-2'
import RecommendationModal from './recommendationmodal'


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
            data: [36, 14, 24, 16]
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




class InvestorQuestionaire extends Component {

  state = {
    firstQuestion: "",
    secondQuestion: "",
    thirdQuestion: "",
    riskTolerance: "",
    chartData: {},
    openModal: false
  }


  handleSubmit = (event) => {
    let firstScore = parseInt(this.state.firstQuestion)
    let secondScore = parseInt(this.state.secondQuestion)
    let thirdScore = parseInt(this.state.thirdQuestion)
    let totalScore = firstScore + secondScore + thirdScore
    this.makeRecommendation(totalScore)
    this.setState({
      openModal: true
    })
  }

  handleClose = () => {
    this.setState({
      openModal: false
    })
  }

  makeRecommendation = (totalScore) => {
    if(totalScore < 10){
      this.setState({riskTolerance: "Conservative"})
    } else if(totalScore > 10 && totalScore < 20){
      this.setState({riskTolerance: "Moderate"})
    } else if(totalScore > 20 ){
      this.setState({riskTolerance: "Aggressive"})
    }
  }

  displayAggressive = () => {
    return(
      <div className="recommendation">
        <div className="recommendationText"> Recommended Allocation: {this.state.riskTolerance} </div>
        <Doughnut data={aggressive} options={chartOptions} height={200} width={200}/>
      </div>
    )
  }
  displayModerate = () => {
    return(
      <div className="recommendation">
        <div className="recommendationText"> Recommended Allocation: {this.state.riskTolerance} </div>
        <Doughnut data={moderate} options={chartOptions} height={200} width={200}/>
      </div>
    )
  }
  displayConservative = () => {
    return(
      <div className="recommendation">
        <div className="recommendationText"> Recommended Allocation: {this.state.riskTolerance} </div>
        <Doughnut data={conservative} options={chartOptions} height={200} width={200}/>
      </div>
    )
  }

  displayRecommendation = () => {
    if(this.state.riskTolerance === "Conservative"){
      return this.displayConservative()
    } else if(this.state.riskTolerance === "Moderate"){
      return this.displayModerate()
    } else if(this.state.riskTolerance === "Aggressive"){
      return this.displayAggressive()
    }
  }



  handleFirstQuestionChange = (e, { value }) => {
    this.setState({ firstQuestion: value })
  }

  handleSecondQuestionChange = (e, { value }) => {
    this.setState({ secondQuestion: value })
  }

  handleThirdQuestionChange = (e, { value }) => {
    this.setState({ thirdQuestion: value })
  }



  render () {
    const firstQuestion = this.state.firstQuestion
    const secondQuestion = this.state.secondQuestion
    const thirdQuestion = this.state.thirdQuestion

    return (
      <div className="background">
        <Grid centered columns={3}>
          <Grid.Column>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label> {" I would describe my knowledge of investments as:"} </label>
                <Form.Radio label='None' value='1' checked={firstQuestion === '1'} onChange={this.handleFirstQuestionChange} />
                <Form.Radio label='Limited' value='3' checked={firstQuestion === '3'} onChange={this.handleFirstQuestionChange} />
                <Form.Radio label='Good' value='7' checked={firstQuestion === '7'} onChange={this.handleFirstQuestionChange} />
                <Form.Radio label='Extensive' value='10' checked={firstQuestion === '10'} onChange={this.handleFirstQuestionChange} />
              </Form.Field>
              <Form.Field>
                <label> {"When I invest my money, I am:"} </label>
                <Form.Radio label='Most concerned about my investment losing value ' value='0' checked={secondQuestion === '0'} onChange={this.handleSecondQuestionChange} />
                <Form.Radio label='Equally concerned about my investment losing or gaining value' value='4' checked={secondQuestion === '4'} onChange={this.handleSecondQuestionChange} />
                <Form.Radio label='Most concerned about my investment gaining value ' value='8' checked={secondQuestion === '8'} onChange={this.handleSecondQuestionChange} />
              </Form.Field>
              <Form.Field>
                <label> {"Imagine that in the past three months, the overall stock market lost 25% of its value. An individual stock investment you own also lost 25% of its value. What would you do?"} </label>
                <Form.Radio label='Sell all of my shares' value='0' checked={thirdQuestion === '0'} onChange={this.handleThirdQuestionChange} />
                <Form.Radio label='Sell some of my shares' value='2' checked={thirdQuestion === '2'} onChange={this.handleThirdQuestionChange} />
                <Form.Radio label='Do nothing' value='5' checked={thirdQuestion === '5'} onChange={this.handleThirdQuestionChange} />
                <Form.Radio label='Buy more shares' value='8' checked={thirdQuestion === '8'} onChange={this.handleThirdQuestionChange} />
              </Form.Field>
              <Button fluid={true} primary={true} color="green" size='huge' type='submit'>Submit Questionaire</Button>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
          {this.state.riskTolerance.length > 0 ?
           < RecommendationModal open={this.state.openModal} closeModal={this.handleClose}/>
           :
           <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
          }
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default InvestorQuestionaire
