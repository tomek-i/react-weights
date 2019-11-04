import React from 'react'

function Stats(props) {

    let min_weight = 0
    let max_weight = 0

    if (props.data) {
        const values = props.data.map(obj => parseFloat(obj.value))
        if (values) {
            [max_weight, min_weight] = [Math.max(...values), Math.min(...values)]
        }

    }

    return (
        <div>
            <p>Your highest weight was: {max_weight} kg</p>
            <p>Your lowest weight was: {min_weight} kg</p>
            <p>That is a difference of: {max_weight - min_weight} kg</p>
        </div>
    )

}

export default Stats
