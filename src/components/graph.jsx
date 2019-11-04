import React from 'react'
import { Line } from 'react-chartjs-2';

function Graph(props) {

  //NOTE: i'm sure there is a combined way to return an array of all dates and another array of all values

  if (props.data) {
    // extract all dates
    let labels = props.data.map(item => {
      const { date } = item
      return date
    })
    // extract all weights
    let weights = props.data.map(item => {
      const { value } = item
      return value

    })


    const data = {
      labels: labels,
      datasets: [{
        label: 'Weight in kg',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: weights,

      }]
    };



    return <Line data={data} height={130} />
  } else {
    return <p>Please enter some data</p>
  }

}

export default Graph