import React, { Component } from 'react'
import { Grid, Button, Form, Segment, Divider, Image } from 'semantic-ui-react'
import RecommendationModal from './recommendationmodal'
import NewAccountForm from './newaccountform'

class InvestorQuestionaire extends Component {

  state = {
    firstQuestion: "",
    secondQuestion: "",
    thirdQuestion: "",
    riskTolerance: "",
    chartData: {},
    openModal: false,
    implement: false
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

  implement = () => {
    this.setState({
      implement: true
    })
  }

  cancelImplement = () => {
    this.setState({
      implement: false
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
        {this.state.implement ?
        < NewAccountForm riskTolerance={this.state.riskTolerance} cancel={this.cancelImplement} />
        :
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
          <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
          {this.state.riskTolerance.length > 0 ?
           < RecommendationModal open={this.state.openModal} closeModal={this.handleClose} riskTolerance={this.state.riskTolerance} implement={this.implement}/>
           :
           null
          }
          </Grid.Column>
        </Grid>
        }
      </div>
    )
  }
}

export default InvestorQuestionaire
