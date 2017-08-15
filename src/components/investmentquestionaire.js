import React, { Component } from 'react'
import { Grid, Button, Form, Segment, Divider, Image } from 'semantic-ui-react'

class InvestorQuestionaire extends Component {

  state = {
    firstQuestion: "",
    secondQuestion: "",
    thirdQuestion: "",
    fourthQuestion: ""
  }


  handleSubmit = (event) => {
    console.log(this.state)
    debugger
  }

  handleFirstQuestionChange = (e, { value }) => this.setState({ firstQuestion: value })
  handleSecondQuestionChange = (e, { value }) => this.setState({ secondQuestion: value })
  handleThirdQuestionChange = (e, { value }) => this.setState({ thirdQuestion: value })
  handleFourthQuestionChange = (e, { value }) => this.setState({ fourthQuestion: value })


  render () {
    const firstQuestion = this.state.firstQuestion
    const secondQuestion = this.state.secondQuestion
    const thirdQuestion = this.state.thirdQuestion
    const fourthQuestion = this.state.fourthQuestion
    return (
      <div className="background">
        <Grid centered columns={3}>
          <Grid.Column>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label> {"I plan to begin withdrawing money from my investments in:"} </label>
                <Form.Radio label='Less than 3 years' value='1' checked={firstQuestion === '1'} onChange={this.handleFirstQuestionChange} />
                <Form.Radio label='3–5 years' value='2' checked={firstQuestion === '2'} onChange={this.handleFirstQuestionChange} />
                <Form.Radio label='6–10 years' value='3' checked={firstQuestion === '3'} onChange={this.handleFirstQuestionChange} />
                <Form.Radio label='11 years or more' value='4' checked={firstQuestion === '4'} onChange={this.handleFirstQuestionChange} />
              </Form.Field>
              <Form.Field>
                <label>  {"Once I begin withdrawing funds from my investments, I plan to spend all of the funds in:"} </label>
                <Form.Radio label='Less than 2 years' value='5' checked={secondQuestion === '5'} onChange={this.handleSecondQuestionChange} />
                <Form.Radio label='2–5 years' value='6' checked={secondQuestion === '6'} onChange={this.handleSecondQuestionChange} />
                <Form.Radio label='6–10 years' value='7' checked={secondQuestion === '7'} onChange={this.handleSecondQuestionChange} />
                <Form.Radio label='11 years or more' value='8' checked={secondQuestion === '8'} onChange={this.handleSecondQuestionChange} />
              </Form.Field>
              <Form.Field>
                <label> {"When I invest my money, I am:"} </label>
                <Form.Radio label='Most concerned about my investment losing value ' value='9' checked={thirdQuestion === '9'} onChange={this.handleThirdQuestionChange} />
                <Form.Radio label='Equally concerned about my investment losing or gaining value' value='10' checked={thirdQuestion === '10'} onChange={this.handleThirdQuestionChange} />
                <Form.Radio label='Most concerned about my investment gaining value ' value='11' checked={thirdQuestion === '11'} onChange={this.handleThirdQuestionChange} />
              </Form.Field>
              <Form.Field>
                <label> {"Imagine that in the past three months, the overall stock market lost 25% of its value. An individual stock investment you own also lost 25% of its value. What would you do?"} </label>
                <Form.Radio label='Sell all of my shares' value='12' checked={fourthQuestion === '12'} onChange={this.handleFourthQuestionChange} />
                <Form.Radio label='Sell some of my shares' value='13' checked={fourthQuestion === '13'} onChange={this.handleFourthQuestionChange} />
                <Form.Radio label='Do nothing' value='14' checked={fourthQuestion === '14'} onChange={this.handleFourthQuestionChange} />
                <Form.Radio label='Buy more shares' value='15' checked={fourthQuestion === '15'} onChange={this.handleFourthQuestionChange} />
              </Form.Field>
              <Button fluid={true} primary={true} color="green" size='huge' type='submit'>Submit Questionaire</Button>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
          <Image src="https://d13yacurqjgara.cloudfront.net/users/110995/screenshots/2094316/pig-animation-final_final2.gif" size="large" centered={true}/>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default InvestorQuestionaire
