import formatCurrency from 'format-currency'

export const options = { format: '%s%v', symbol: '$' }

export const chartOptions = {
  maintainAspectRatio: false,
  title:{
    display: false,
    text: "Stock Performance",
    fontSize: 25,
    position: "top",
    fontColor: "black"
  },
  legend: {
    display: false
  },
  scales: {
            xAxes: [
              {
                  ticks: {
                     callback: function(label, index, labels) {
                       return label;
                     }
                  }
              }
            ],
            yAxes: [
              { ticks: {
                     callback: function(label, index, labels) {
                       return label;
                     },
                     fontSize: 18,
                     fontColor: 'black'
                     },
                     display: true,
                }
            ]
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
                   return formatCurrency(value, options)
                }
              }
            }
}
