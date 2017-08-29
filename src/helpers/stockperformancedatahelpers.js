export const chartOptions = {
  maintainAspectRatio: false,
  title:{
    display: true,
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
        }
}
