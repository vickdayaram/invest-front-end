import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export const conservative =  {
            labels: ["VTI", "VXUS", "BND", "BNDX"],
            datasets: [{
            label: "Conservative Allocation",
            backgroundColor: ["#C61919", "#C61919", "#202759", "#202759"],
            borderColor: 'rgb(255, 99, 132)',
            data: [24, 16, 42, 18]
        }]
    }
export const moderate =  {
            labels: ["VTI", "VXUS", "BND", "BNDX"],
            datasets: [{
            label: "Moderate Allocation",
            backgroundColor: ["#C61919", "#C61919", "#202759", "#202759"],
            borderColor: 'rgb(255, 99, 132)',
            data: [30, 20, 35, 15]
        }]
    }
export const aggressive =  {
            labels: ["VTI", "VXUS", "BND", "BNDX"],
            datasets: [{
            label: "Aggressive Allocation",
            backgroundColor: ["#C61919", "#C61919", "#202759", "#202759"],
            borderColor: 'rgb(255, 99, 132)',
            data: [36, 24, 28, 12]
        }]
    }

export const displayAggressive = () => {
  return(
    <div className="recommendation">
      <div className="recommendationText"> Recommended Allocation: Aggressive </div>
      <div className="recommendationText"> 60/40, Stock to Bonds </div>
      <Doughnut data={aggressive} options={chartOptions} height={175} width={175}/>
    </div>
  )
}
export const displayModerate = () => {
  return(
    <div className="recommendation">
      <div className="recommendationText"> Recommended Allocation: Moderate </div>
      <div className="recommendationText"> 50/50, Stock to Bonds </div>
      <Doughnut data={moderate} options={chartOptions} height={175} width={175}/>
    </div>
  )
}
export const displayConservative = () => {
  return(
    <div className="recommendation">
      <div className="recommendationText"> Recommended Allocation: Conservative </div>
      <div className="recommendationText"> 40/60, Stock to Bonds </div>
      <Doughnut data={conservative} options={chartOptions} height={175} width={175}/>
    </div>
  )
}

export const chartOptions = {
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
