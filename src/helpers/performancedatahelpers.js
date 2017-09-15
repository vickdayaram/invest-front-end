
export const chartOptions = {
  maintainAspectRatio: false,
  title:{
    display: true,
    text: "US Sector Performance Data",
    fontSize: 25,
    position: "top",
    fontColor: "black"
  },
  scales: {
            xAxes: [
              {
                  ticks: {
                     callback: function(label, index, labels) {
                       return label.toFixed(2) + "%";
                     }
                  }
              }
            ],
            yAxes: [
              {
                  ticks: {
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
  legend:{
    display: false,
    position: "right",
    labels: {
      fontColor: 'rgb(60, 180, 75)'
    }
  },
  tooltips: {
    enabled: true,
    titleFontSize: 24,
  }

}

export const rangeOptions = [
  { key: 'Real-Time Performance', text: 'Real-Time Performance', value: 'Real-Time Performance' },
  { key: '1 Day Performance', text: '1 Day Performance', value: '1 Day Performance' },
  { key: '5 Day Performance', text: '5 Day Performance', value: '5 Day Performance' },
  { key: '1 Month Performance', text: '1 Month Performance', value: '1 Month Performance' },
  { key: '3 Month Performance', text: '3 Month Performance', value: '3 Month Performance' },
  { key: 'Year-to-Date (YTD) Performance', text: 'Year-to-Date (YTD) Performance', value: 'Year-to-Date (YTD) Performance' },
  { key: '1 Year Performance', text: '1 Year Performance', value: '1 Year Performance' },
  { key: '3 Year Performance', text: '3 Year Performance', value: '3 Year Performance' },
  { key: '5 Year Performance', text: '5 Year Performance', value: '5 Year Performance' },
  { key: '10 Year Performance', text: '10 Year Performance', value: '10 Year Performance' }
]
