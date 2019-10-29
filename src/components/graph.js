import React,{useEffect} from 'react'
import { Chart } from 'react-charts'

function Graph(props){

    let points = props.data.map((item,index)=>[].concat([index,parseInt(item)]))
    const example = [[0, 20], [1, 25],]

    useEffect(() => {
        if(points)
            console.log("use",points)
    },[points])

    const data = React.useMemo(
        () => [
          {
            label: 'Weights',
            data:points
          },

        ],
        [points]
      )
      const axes = React.useMemo(
        () => [
          { primary: true, type: 'linear', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
      )
      const lineChart = (
        // A react-chart hyper-responsively and continuusly fills the available
        // space of its parent element automatically
        <div
          style={{
            width: '500px',
            height: '400px'
          }}
        >
          <Chart data={data} axes={axes} />
        </div>
      )

      return lineChart

}

export default Graph