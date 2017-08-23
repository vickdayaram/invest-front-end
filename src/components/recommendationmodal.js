import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Header, Icon, Image, Modal, Container } from 'semantic-ui-react'
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
      },
      tooltips: {
                  enabled: true,
                  legend: false,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  bodyFontSize: 16,
                  callbacks: {
                    label: function(tooltipItem, data) {
                       let label = data.labels[tooltipItem.index]
                       let value = data.datasets[0].data[tooltipItem.index]
                       return label + " " + value + "%"
                    }
                  }
                }
    }

const displayAggressive = () => {
  return(
    <div className="recommendation">
      <div className="recommendationText"> Recommended Allocation: Aggressive </div>
      <div className="recommendationText"> 60/40, Stock to Bonds </div>
      <Doughnut data={aggressive} options={chartOptions} height={175} width={175}/>
    </div>
  )
}
const displayModerate = () => {
  return(
    <div className="recommendation">
      <div className="recommendationText"> Recommended Allocation: Moderate </div>
      <div className="recommendationText"> 50/50, Stock to Bonds </div>
      <Doughnut data={moderate} options={chartOptions} height={175} width={175}/>
    </div>
  )
}
const displayConservative = () => {
  return(
    <div className="recommendation">
      <div className="recommendationText"> Recommended Allocation: Conservative </div>
      <div className="recommendationText"> 40/60, Stock to Bonds </div>
      <Doughnut data={conservative} options={chartOptions} height={175} width={175}/>
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
    <Modal.Header>We Recommend a {this.props.riskTolerance} portfolio. Note: Managed portfolios do not have trading enabled. </Modal.Header>
    <Modal.Content image scrolling>
      {this.handleDisplay()}

      <Modal.Description>
        <div className="portfoliodetails">
          <h2>Portfolio Details:</h2>
          <p>This portoflio implements a low-cost index based approach using Vanguard ETFs.</p>
          <p>With these four investments, an investor will have global exposure to</p>
          <p>the stock and bond markets.</p>
          <h2>Investment Details:</h2>
          <h3>Vanguard Total Stock Market ETF </h3>
          <h4>Symbol: VTI </h4>
          <h4>Expense Ratio: 0.04% </h4>
          <p>Seeks to track the performance of the CRSP US Total Market Index.</p>
          <p>Large-, mid-, and small-cap equity diversified across growth and value styles.</p>
          <p>Employs a passively managed, index-sampling strategy.</p>
          <p>The fund remains fully invested.</p>
          <p>Low expenses minimize net tracking error.</p>
          <br/>
          <h3>Vanguard Total International Stock Market ETF</h3>
          <h4>Symbol: VXUS </h4>
          <h4>Expense Ratio: 0.11% </h4>
          <p>Seeks to track the performance of the FTSE Global All Cap ex US Index,</p>
          <p>which measures the investment return of stocks issued by companies</p>
          <p>located outside the United States.</p>
          <p>Broad exposure across developed and emerging non-U.S. equity markets.</p>
          <p>Follows a passively managed, index replication approach.</p>
          <br/>
          <h3>Vanguard Total Bond Market ETF </h3>
          <h4>Symbol: BND </h4>
          <h4>Expense Ratio: 0.05% </h4>
          <p>Provides broad exposure to U.S. investment grade bonds.</p>
          <p>Goal is to keep pace with U.S. bond market returns.</p>
          <p>Offers relatively high potential for investment income; </p>
          <p>share value tends to rise and fall modestly.</p>
          <p>More appropriate for medium- or long-term goals where you’re </p>
          <p>looking for a reliable income stream.</p>
          <p>Appropriate for diversifying the risks of stocks in a portfolio.</p>
          <br/>
          <h3>Vanguard Total International Bond Market ETF </h3>
          <h4>Symbol: BNDX </h4>
          <h4>Expense Ratio: 0.12% </h4>
          <p>Attempts to track the performance of the Bloomberg Barclays Global</p>
          <p>Aggregate ex-USD Float Adjusted RIC Capped Index (USD Hedged).</p>
          <p>Employs hedging strategies to protect against uncertainty in exchange rates.</p>
          <p>Provides a convenient way to get broad exposure to non-US dollar </p>
          <p>denominated investment-grade bonds.</p>
          <p>Passively managed, using index sampling.</p>
          <br/>
          <h3>Interested in implementing this portfolio? </h3>
          <p>If you are interested in implementing this portfolio, click on the</p>
          <p>Proceed to implement button below.</p>
          <p>All investment details come from the Vanguard website.</p>
          <p>This recommendation does not substitute an over all financial planning assesment.</p>
          <p>If are uncertain about your finances and have additional questions, </p>
          <p>seek the help of a financial advisor.</p>
          <h3>Important Notice</h3>
          <h3>You will not have trading access to this account. it is intended to </h3>
          <h3>grow indefinitly and show you how an index based approach can work. </h3>
        </div>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary onClick={this.handleClose}>
        <Icon name='left chevron' /> Back to Questionaire
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
