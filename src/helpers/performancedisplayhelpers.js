import formatCurrency from 'format-currency'

export const options = { format: '%s%v', symbol: '$' }

export const chartOptions = {
  maintainAspectRatio: false,
  title:{
    display: false,
    text: "Portfolio Allocation",
    fontSize: 25,
    position: "top",
    fontColor: "black"
  },
  legend:{
    display: false,
    position: "top",
    fullWidth: false,
    boxWidth: 10
  },
  cutoutPercentage: 35,
  tooltips: {
              enabled: true,
              legend: false,
              backgroundColor: 'rgba(0,0,0,0.8)',
              bodyFontSize: 16,
              callbacks: {
                label: function(tooltipItem, data) {
                   let label = data.labels[tooltipItem.index]
                   let value = data.datasets[0].data[tooltipItem.index]
                   return label + " " + formatCurrency(value, options)
                }
              }
            }

}
